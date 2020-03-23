import {Consumer, Kafka} from "kafkajs";
import {Caster} from "../../caster/caster";
import {KafkaMessage} from "../../models/message/kafkaMessage";
import {KafkaConsumerBuilder} from "./builder/kafkaConsumerBuilder";
import {Session} from "../../models/session/session";


export abstract class KafkaConsumer {

    private kafkaClient: Kafka;
    private readonly topic: string;
    private readonly consumer: Consumer;
    protected caster: Caster;
    private readonly filter: object = {};

    protected constructor(kafkaConsumerBuilder: KafkaConsumerBuilder) {
        let kafkaConfig = {
            logLevel: kafkaConsumerBuilder.logLevel,
            brokers: kafkaConsumerBuilder.brokers,
            clientId: kafkaConsumerBuilder.clientId,
            ...kafkaConsumerBuilder.additionalProperties
        };
        if (kafkaConsumerBuilder.saslOptions != null) {
            kafkaConfig["sasl"] = kafkaConsumerBuilder.saslOptions;
        }
        this.kafkaClient = new Kafka(kafkaConfig);
        this.topic = kafkaConsumerBuilder.topic;
        this.caster = kafkaConsumerBuilder.getCaster();
        this.consumer = this.kafkaClient.consumer({groupId: kafkaConsumerBuilder.groupId});

        //initialise the filter
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

    private async commit(topic: string, partition: number, offset: string) {
        await this.consumer.commitOffsets([{
            topic: topic,
            partition: partition,
            offset: String(parseInt(offset) + 1)
        }]);
    }

    /**
     *
     * @param callback
     * @param autoCommit
     * @throws  CastingEventError upon failure casting from KafkaMessage to IceCubeEvent
     */
    public async getMessage(callback: (serviceEvent: Session) => void, autoCommit: boolean = true) {
        await this.consumer.connect();
        await this.consumer.subscribe({topic: this.topic, fromBeginning: true});
        return this.consumer.run({
                autoCommit: autoCommit,
                eachMessage: async ({topic, partition, message}) => {
                    let message_headers = {};
                    for (let header in message.headers) {
                        message_headers[header] = message.headers[header].toString();
                    }
                    if (this.filter != null) {
                        if (!this.validateHeadersByFilter(message_headers)) {
                            await this.commit(topic, partition, message.offset);
                            return;
                        }
                    }
                    let message_value_object = JSON.parse(message.value.toString());
                    await callback(new Session(this.consumer, topic, partition, message.offset,
                        this.caster.kafkaMessageToIceCubeEvent(new KafkaMessage(message_value_object, message_headers))))
                }
            }
        )
    }

    public async disconnect() {
        await this.consumer.disconnect();
    }
}