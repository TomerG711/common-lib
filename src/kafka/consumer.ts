import {Kafka, logLevel} from "kafkajs";

export class KafkaConsumer {

    private kafkaClient: Kafka;
    private topic: string;

    public constructor(logLevel: logLevel, clientId: string, topic: string, brokers: string[]) {
        this.kafkaClient = new Kafka({logLevel: logLevel, brokers: brokers, clientId: clientId});
        this.topic = topic;
    }

}