import {logLevel, SASLOptions} from "kafkajs";
import {KafkaConsumer} from "../kafkaConsumer";
import {Caster} from "../../../caster/caster";

//TODO: Add the option to give costume configuration to kafka client
export abstract class KafkaConsumerBuilder {

    public logLevel: logLevel;
    public clientId: string;
    public groupId: string;
    public topic: string;
    public brokers: string[];
    public saslOptions?: SASLOptions;
    public filter: object;
    protected caster: Caster;

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

    setFilter(filter: object) {
        this.filter = filter;
        return this;
    }

    getCaster(): Caster {
        return this.caster;
    }
}