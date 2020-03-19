import {logLevel, SASLOptions} from "kafkajs";
import {kafkaProducer} from "../kafkaProducer";

export abstract class KafkaProducerBuilder {
    public logLevel: logLevel;
    public clientId: string;
    public topic: string;
    public brokers: string[];
    public transactionalId: string;
    public saslOptions?: SASLOptions;

    abstract build(): kafkaProducer;

    setLogLevel(logLevel: logLevel) {
        this.logLevel = logLevel;
        return this;
    }

    setClientId(clientId: string) {
        this.clientId = clientId;
        return this;
    }

    setTopic(topic: string) {
        this.topic = topic;
        return this;
    }

    setBrokers(brokers: string[]) {
        this.brokers = brokers;
        return this;
    }

    setTransactionalId(transactionalId: string) {
        this.transactionalId = transactionalId;
        return this;
    }

    setSASLOptions(saslOptions: SASLOptions) {
        this.saslOptions = saslOptions;
        return this;
    }
}