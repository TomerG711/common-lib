import {logLevel, SASLOptions} from "kafkajs";
import {KafkaConsumer} from "../kafkaConsumer";

export abstract class KafkaConsumerBuilder {
    public logLevel: logLevel;
    public clientId: string;
    public groupId: string;
    public topic: string;
    public brokers: string[];
    public saslOptions?: SASLOptions;

    abstract build(): KafkaConsumer;

    setLogLevel(logLevel: logLevel) {
        this.logLevel = logLevel;
        return this;
    }

    setClientId(clientId: string) {
        this.clientId = clientId;
        return this;
    }

    setGroupId(groupId: string) {
        this.groupId = groupId;
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

    setSASLOptions(saslOptions: SASLOptions) {
        this.saslOptions = saslOptions;
        return this;
    }
}