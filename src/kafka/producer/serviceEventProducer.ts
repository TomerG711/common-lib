import {kafkaProducer} from "./kafkaProducer";
import {ServiceEventCaster} from "../../caster/serviceEventCaster";
import {ServiceEventProducerBuilder} from "./builder/serviceEventProducerBuilder";

export class ServiceEventProducer extends kafkaProducer {
    /**
     *
     * @param serviceEventProducerBuilder
     */
    public constructor(serviceEventProducerBuilder: ServiceEventProducerBuilder) {
        super(serviceEventProducerBuilder);
        this.caster = new ServiceEventCaster()
    }

}