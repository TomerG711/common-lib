import {logLevel} from "kafkajs";
import {AbstractKafkaConsumer} from "./abstacrtConsumer";
import {ServiceEventCaster} from "../../caster/serviceEventCaster";

export class ServiceEventConsumer extends AbstractKafkaConsumer {
    public constructor(logLevel: logLevel, groupId: string, topic: string, brokers: string[]) {
        super(logLevel, groupId, topic, brokers);
        this.caster = new ServiceEventCaster()
    }

}