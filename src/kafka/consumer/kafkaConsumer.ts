import {Consumer, Kafka} from "kafkajs";
import {Caster} from "../../caster/caster";
import {IceCubeEvent} from "../../models/event/iceCubeEvent";
import {KafkaMessage} from "../../models/message/kafkaMessage";
import {KafkaConsumerBuilder} from "./builder/kafkaConsumerBuilder";


export abstract class KafkaConsumer {

    private kafkaClient: Kafka;
    private readonly topic: string;
    private consumer: Consumer;
    protected caster: Caster;
    private readonly filter: object;

    protected constructor(kafkaConsumerBuilder: KafkaConsumerBuilder) {
        let kafkaConfig = {
            logLevel: kafkaConsumerBuilder.logLevel,
            brokers: kafkaConsumerBuilder.brokers,
            clientId: kafkaConsumerBuilder.clientId
        };
        if (kafkaConsumerBuilder.saslOptions != null) {
            kafkaConfig["sasl"] = kafkaConsumerBuilder.saslOptions;
        }
        this.kafkaClient = new Kafka(kafkaConfig);
        this.topic = kafkaConsumerBuilder.topic;
        this.consumer = this.kafkaClient.consumer({groupId: kafkaConsumerBuilder.groupId});
        //initialise the filter
        this.filter = {};
        for (let key in kafkaConsumerBuilder.filter) {
            this.filter[key] = new RegExp(kafkaConsumerBuilder.filter[key]);
        }
    }

    private validateHeadersByFilter(message_headers: object): boolean {
        for (let key in this.filter) {
            if (!this.filter[key].test(message_headers[key])) {
                return false;
            }
        }
        return true;
    }

    private async commit(topic, partition, offest) {
        await this.consumer.commitOffsets([{
            topic: topic,
            partition: partition,
            offset: offest
        }]);
    }

    public async getMessage(callback: (serviceEvent: IceCubeEvent) => any) {
        await this.consumer.connect();
        await this.consumer.subscribe({topic: this.topic, fromBeginning: true});
        return this.consumer.run({
            autoCommit: false,
            eachMessage: async ({topic, partition, message}) => {
                let message_headers = {};
                for (let header in message.headers) {
                    message_headers[header] = message.headers[header].toString();
                }
                if (this.filter != null) {
                    if (!this.validateHeadersByFilter(message_headers)) {
                        this.commit(topic, partition, String(parseInt(message.offset) + 1));
                        return;
                    }
                }
                let message_value_object = JSON.parse(message.value.toString());
                let callBackResult = callback(this.caster.kafkaMessageToIceCubeEvent(new KafkaMessage(message_value_object, message_headers)));
                this.commit(topic, partition, String(parseInt(message.offset) + 1));
                return callBackResult;
            }
            }
        )
    }
}