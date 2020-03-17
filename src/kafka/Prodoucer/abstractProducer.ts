import {Producer, Kafka, logLevel} from "kafkajs";
import {ICaster} from "../../eventSchemas/Caster/ICaster";
import {KafkaMessage} from "../../eventSchemas/Caster/kafkaMessage";
import {KafkaEvent} from "../../eventSchemas/kafkaEvent";

export abstract class AbstractKafkaProducer {

    private kafkaClient: Kafka;
    private readonly topic: string;
    private producer: Producer;
    protected caster: ICaster;

    protected constructor(logLevel: logLevel, clientId: string, topic: string, brokers: string[]) {
        this.kafkaClient = new Kafka({logLevel: logLevel, brokers: brokers});
        this.topic = topic;
        this.producer = this.kafkaClient.producer({idempotent: true, maxInFlightRequests: 1});
    }

    public async sendMessage(event: KafkaEvent) {
        let transaction = await this.producer.transaction();
        try {
            let message: KafkaMessage = this.caster.kafkaEventToKafkaMessage((event));
            // let headers = [{serviceName: serviceName, operation: operation}];
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
