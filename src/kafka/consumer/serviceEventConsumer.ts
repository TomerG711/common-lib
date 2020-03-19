import {KafkaConsumer} from "./kafkaConsumer";
import {ServiceEventCaster} from "../../caster/serviceEventCaster";
import {ServiceEventConsumerBuilder} from "./builder/serviceEventConsumerBuilder";

export class ServiceEventConsumer extends KafkaConsumer {
    public constructor(serviceEventConsumerBuilder: ServiceEventConsumerBuilder) {
        super(serviceEventConsumerBuilder);
        this.caster = new ServiceEventCaster()
    }

}