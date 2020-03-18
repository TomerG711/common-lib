import {Producer, Kafka, logLevel, SASLOptions} from "kafkajs";
import {KafkaMessage} from "../../models/message/kafkaMessage";
import {IceCubeEvent} from "../../models/event/iceCubeEvent";
import {Caster} from "../../caster/caster";


export abstract class AbstractKafkaProducer {

    private kafkaClient: Kafka;
    private readonly topic: string;
    private producer: Producer;
    protected caster: Caster;

    protected constructor(logLevel: logLevel, clientId: string, topic: string, brokers: string[], saslConfig?: SASLOptions) {
        let kafkaConfig = {logLevel: logLevel, brokers: brokers};
        if (saslConfig != null) {
            kafkaConfig["sasl"] = saslConfig;
        }
        this.kafkaClient = new Kafka(kafkaConfig);
        this.topic = topic;
        this.producer = this.kafkaClient.producer({idempotent: true, maxInFlightRequests: 1});
    }

    public async sendMessage(event: IceCubeEvent) {
        let transaction = await this.producer.transaction();
        try {
            let message: KafkaMessage = this.caster.iceCubeEventToKafkaMessage((event));
            await transaction.send({
                topic: this.topic,
                messages: [{key: message.value["transactionId"], value: message.value, headers: message.headers}]
            });
            await transaction.commit();
        } catch (e) {
            await transaction.abort();
            throw e;
        }
    }
}
