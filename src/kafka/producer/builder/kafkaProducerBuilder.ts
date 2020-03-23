import {kafkaProducer} from "../kafkaProducer";
import {KafkaBuilder} from "../../kafkaBuilder";

export abstract class KafkaProducerBuilder extends KafkaBuilder {
    public transactionalId: string;

    abstract build(): kafkaProducer;

    setTransactionalId(transactionalId: string) {
        this.transactionalId = transactionalId;
        return this;
    }
}