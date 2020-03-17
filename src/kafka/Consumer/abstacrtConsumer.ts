import {Consumer, Kafka, logLevel} from "kafkajs";
import {ICaster} from "../../eventSchemas/Caster/ICaster";
import {KafkaMessage} from "../../eventSchemas/Caster/kafkaMessage";
import {KafkaEvent} from "../../eventSchemas/kafkaEvent";

export abstract class AbstractKafkaConsumer {

    private kafkaClient: Kafka;
    private readonly topic: string;
    private consumer: Consumer;
    protected caster: ICaster;

    protected constructor(logLevel: logLevel, groupId: string, topic: string, brokers: string[]) {
        this.kafkaClient = new Kafka({logLevel: logLevel, brokers: brokers, clientId: groupId});
        this.topic = topic;
        this.consumer = this.kafkaClient.consumer({groupId: groupId});
    }

    public async getMessage(callback: (serviceEvent: KafkaEvent) => void) {
        await this.consumer.connect();
        await this.consumer.subscribe({topic: this.topic, fromBeginning: true});
        return this.consumer.run({
                eachMessage: async ({message}) => {
                    let message_value_object = JSON.parse(message.value.toString());
                    let message_header = message.headers;
                    let kafkaMessage = new KafkaMessage(message_value_object, message_header);
                    return callback(this.caster.kafkaMessageToKafkaEvent(kafkaMessage))
                }
            }
        )
    }
}