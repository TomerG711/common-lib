import {Consumer, Kafka, logLevel, SASLOptions} from "kafkajs";
import {Caster} from "../../caster/caster";
import {IceCubeEvent} from "../../models/event/iceCubeEvent";
import {KafkaMessage} from "../../models/message/kafkaMessage";


export abstract class AbstractKafkaConsumer {

    private kafkaClient: Kafka;
    private readonly topic: string;
    private consumer: Consumer;
    protected caster: Caster;

    protected constructor(logLevel: logLevel, groupId: string, topic: string, brokers: string[], saslConfig?: SASLOptions) {
        let kafkaConfig = {logLevel: logLevel, brokers: brokers, clientId: groupId};
        if (saslConfig != null) {
            kafkaConfig["sasl"] = saslConfig;
        }
        this.kafkaClient = new Kafka(kafkaConfig);
        this.topic = topic;
        this.consumer = this.kafkaClient.consumer({groupId: groupId});
    }

    public async getMessage(callback: (serviceEvent: IceCubeEvent) => void) {
        await this.consumer.connect();
        await this.consumer.subscribe({topic: this.topic, fromBeginning: true});
        return this.consumer.run({
                eachMessage: async ({message}) => {
                    let message_value_object = JSON.parse(message.value.toString());
                    let message_header = message.headers;
                    let kafkaMessage = new KafkaMessage(message_value_object, message_header);
                    return callback(this.caster.kafkaMessageToIceCubeEvent(kafkaMessage))
                }
            }
        )
    }
}