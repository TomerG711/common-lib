import {KafkaProducerBuilder} from "./kafkaProducerBuilder";
import {kafkaProducer} from "../kafkaProducer";
import {ServiceEventProducer} from "../serviceEventProducer";
import {ServiceEventCaster} from "../../../caster/serviceEventCaster";

export class ServiceEventProducerBuilder extends KafkaProducerBuilder {

    public constructor() {
        super();
        this.caster = new ServiceEventCaster();
    }

    build(): kafkaProducer {
        return new ServiceEventProducer(this);
    }

}