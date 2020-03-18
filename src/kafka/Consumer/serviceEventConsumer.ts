import {logLevel} from "kafkajs";
import {AbstractKafkaConsumer} from "./abstacrtConsumer";
import {ServiceEventCaster} from "../../caster/serviceEventCaster";

export class ServiceEventConsumer extends AbstractKafkaConsumer {
    public constructor(logLevel: logLevel, clientId: string, groupId: string, topic: string, brokers: string[]) {
        super(logLevel, clientId, groupId, topic, brokers);
        this.caster = new ServiceEventCaster()
    }

}