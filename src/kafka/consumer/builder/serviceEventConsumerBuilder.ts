import {KafkaConsumerBuilder} from "./kafkaConsumerBuilder";
import {KafkaConsumer} from "../kafkaConsumer";
import {ServiceEventConsumer} from "../serviceEventConsumer";
import {ServiceEventCaster} from "../../../caster/serviceEventCaster";

export class ServiceEventConsumerBuilder extends KafkaConsumerBuilder {

    public constructor() {
        super();
        this.caster = new ServiceEventCaster();
    }

    build(): KafkaConsumer {
        return new ServiceEventConsumer(this);
    }

}