import {logLevel} from "kafkajs";
import {AbstractKafkaProducer} from "./abstractProducer";
import {ServiceEventCaster} from "../../caster/serviceEventCaster";

export class ServiceEventProducer extends AbstractKafkaProducer {
    public constructor(logLevel: logLevel, clientId: string, topic: string, brokers: string[]) {
        super(logLevel, clientId, topic, brokers);
        this.caster = new ServiceEventCaster()
    }

}