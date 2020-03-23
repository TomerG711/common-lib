import {logLevel, SASLOptions} from "kafkajs";
import {kafkaProducer} from "../kafkaProducer";
import {Caster} from "../../../caster/caster";

//TODO: Add the option to give costume configuration to kafka client
export abstract class KafkaProducerBuilder {
    public logLevel: logLevel;
    public clientId: string;
    public topic: string;
    public brokers: string[];
    public transactionalId: string;
    public saslOptions?: SASLOptions;
    protected caster: Caster;

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

    getCaster(): Caster {
        return this.caster;
    }
}