import {logLevel, SASLOptions} from "kafkajs";
import {AbstractKafkaProducer} from "./abstractProducer";
import {ServiceEventCaster} from "../../caster/serviceEventCaster";

export class ServiceEventProducer extends AbstractKafkaProducer {
    public constructor(logLevel: logLevel, clientId: string, topic: string, brokers: string[], saslConfig?: SASLOptions) {
        super(logLevel, clientId, topic, brokers, saslConfig);
        this.caster = new ServiceEventCaster()
    }

}