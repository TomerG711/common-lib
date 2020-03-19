import {Consumer, Kafka,} from "kafkajs";
import {Caster} from "../../caster/caster";
import {IceCubeEvent} from "../../models/event/iceCubeEvent";
import {KafkaMessage} from "../../models/message/kafkaMessage";
import {KafkaConsumerBuilder} from "./builder/kafkaConsumerBuilder";


export abstract class KafkaConsumer {

    private kafkaClient: Kafka;
    private readonly topic: string;
    private consumer: Consumer;
    protected caster: Caster;

    protected constructor(kafkaConsumerBuilder: KafkaConsumerBuilder) {
        let kafkaConfig = {logLevel: kafkaConsumerBuilder.logLevel, brokers: kafkaConsumerBuilder.brokers, clientId: kafkaConsumerBuilder.clientId};
        if (kafkaConsumerBuilder.saslOptions != null) {
            kafkaConfig["sasl"] = kafkaConsumerBuilder.saslOptions;
        }
        this.kafkaClient = new Kafka(kafkaConfig);
        this.topic = kafkaConsumerBuilder.topic;
        this.consumer = this.kafkaClient.consumer({groupId: kafkaConsumerBuilder.groupId});
    }

    public async getMessage(callback: (serviceEvent: IceCubeEvent) => void) {
        await this.consumer.connect();
        await this.consumer.subscribe({topic: this.topic, fromBeginning: true});
        return this.consumer.run({
                eachMessage: async ({message}) => {
                    let message_value_object = JSON.parse(message.value.toString());
                    let message_headers = {};
                    for (let header in message.headers) {
                        message_headers[header] = message.headers[header].toString();
                    }
                    let kafkaMessage = new KafkaMessage(message_value_object, message_headers);
                    return callback(this.caster.kafkaMessageToIceCubeEvent(kafkaMessage))
                }
            }
        )
    }
}