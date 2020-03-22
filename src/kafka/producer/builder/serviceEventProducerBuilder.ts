import {KafkaProducerBuilder} from "./kafkaProducerBuilder";
import {kafkaProducer} from "../kafkaProducer";
import {ServiceEventProducer} from "../serviceEventProducer";

export class ServiceEventProducerBuilder extends KafkaProducerBuilder{

    build(): kafkaProducer {
        return new ServiceEventProducer(this);
    }

}