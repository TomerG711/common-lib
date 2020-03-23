import {Kafka, Producer, Transaction} from "kafkajs";
import {KafkaMessage} from "../../models/message/kafkaMessage";
import {IceCubeEvent} from "../../models/event/iceCubeEvent";
import {Caster} from "../../caster/caster";
import {KafkaProducerBuilder} from "./builder/kafkaProducerBuilder";


export abstract class kafkaProducer {

    private kafkaClient: Kafka;
    private readonly topic: string;
    private producer: Producer;
    protected caster: Caster;
    private transaction: Transaction;

    protected constructor(kafkaProducerBuilder: KafkaProducerBuilder) {
        let kafkaConfig = {
            logLevel: kafkaProducerBuilder.logLevel,
            brokers: kafkaProducerBuilder.brokers,
            clientId: kafkaProducerBuilder.clientId
        };
        if (kafkaProducerBuilder.saslOptions != null) {
            kafkaConfig["sasl"] = kafkaProducerBuilder.saslOptions;
        }
        this.kafkaClient = new Kafka(kafkaConfig);
        this.topic = kafkaProducerBuilder.topic;
        this.producer = this.kafkaClient.producer({
            idempotent: true,
            maxInFlightRequests: 1,
            transactionalId: kafkaProducerBuilder.transactionalId
        });
    }

    public async sendMessage(iceCubeEvent: IceCubeEvent) {
        this.transaction = await this.producer.transaction();
        try {
            let message: KafkaMessage = this.caster.iceCubeEventToKafkaMessage((iceCubeEvent));
            await this.transaction.send({
                topic: this.topic,
                messages: [{
                    key: iceCubeEvent.transactionId,
                    value: JSON.stringify(message.value),
                    headers: message.headers
                }]
            });
            await this.transaction.commit();
        } catch (e) {
            await this.transaction.abort();
            throw e;
        }
    }

    public async disconnect() {
        try {
            await this.transaction.commit();
        } finally {
            await this.producer.disconnect();
        }
    }
}
