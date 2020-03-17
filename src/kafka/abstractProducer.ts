import {Kafka, logLevel, Producer} from "kafkajs";
import {KafkaEvent} from "../eventSchemas/kafkaEvent";
import {ICaster} from "../eventSchemas/Caster/ICaster";

export abstract class AbstractKafkaProducer {

    private kafkaClient: Kafka;
    private readonly topic: string;
    private producer: Producer;
    private caster: ICaster;

    public constructor(logLevel: logLevel, clientId: string, topic: string, brokers: string[], caster: ICaster) {
        this.kafkaClient = new Kafka({logLevel: logLevel, brokers: brokers, clientId: clientId});
        this.topic = topic;
        this.producer = this.kafkaClient.producer({idempotent: true, maxInFlightRequests: 1});
        this.caster = caster;
    }

    public async sendMessage(event: KafkaEvent, operation: string, serviceName: string) {
        let transaction = await this.producer.transaction();
        try {
            let message = this.caster.kafkaEventToKafkaMessage((event));
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
