import {KafkaConsumerBuilder} from "./kafkaConsumerBuilder";
import {KafkaConsumer} from "../kafkaConsumer";
import {ServiceEventConsumer} from "../serviceEventConsumer";

export class ServiceEventConsumerBuilder extends KafkaConsumerBuilder {
    build(): KafkaConsumer {
        return new ServiceEventConsumer(this);
    }

}