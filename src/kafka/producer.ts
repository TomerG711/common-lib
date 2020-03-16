import {Kafka, logLevel, Producer} from "kafkajs";
import {KafkaEvent} from "../eventSchemas/kafkaEvent";

export class KafkaProducer {

    private kafkaClient: Kafka;
    private topic: string;
    private producer: Producer;


    public constructor(logLevel: logLevel, clientId: string, topic: string, brokers: string[]) {
        this.kafkaClient = new Kafka({logLevel: logLevel, brokers: brokers, clientId: clientId});
        this.topic = topic;
        this.producer = this.kafkaClient.producer({idempotent: true, maxInFlightRequests: 1});
    }

    public async sendMessage(event: KafkaEvent, operation: string, serviceName: string) {
        let transaction = await this.producer.transaction();
        try {
            let headers = [{serviceName: serviceName, operation: operation}];
            await transaction.send({
                topic: this.topic,
                messages: [{key: event.transactionId, value: event, headers: headers}]
            });
            await transaction.commit();
        } catch (e) {
            await transaction.abort();
            throw e;
        }
    }
}
