import {Consumer, Kafka, logLevel} from "kafkajs";
import {ICaster} from "../eventSchemas/Caster/ICaster";
import {KafkaMessage} from "../eventSchemas/Caster/kafkaMessage";
import {KafkaEvent} from "../eventSchemas/kafkaEvent";

export abstract class abstractKafkaConsumer {

    private kafkaClient: Kafka;
    private topic: string;
    private consumer: Consumer;
    private canster: ICaster;

    public constructor(logLevel: logLevel, groupId: string, topic: string, brokers: string[], caster: ICaster) {
        this.kafkaClient = new Kafka({logLevel: logLevel, brokers: brokers, clientId: groupId});
        this.topic = topic;
        this.consumer = this.kafkaClient.consumer({groupId: groupId})
        this.canster = caster;
    }

    public async getMessage(fun : (serviceEvent:KafkaEvent) => void) {
        return this.consumer.run({
                eachMessage: async ({topic, partition, message}) => {
                    let message_value_object = JSON.parse(message.value.toString());
                    let message_header = message.headers;
                    let kafkaMessage = new KafkaMessage(message_value_object, message_header);
                    return fun(this.canster.kafkaMessageToKafkaEvent(kafkaMessage))
                }
            }
        )
    }
}