import {KafkaProducerBuilder} from "./kafkaProducerBuilder";
import {kafkaProducer} from "../kafkaProducer";
import {TransactionManagerProducer} from "../transactionManagerProducer";

export class TransactionManagerProducerBuilder extends KafkaProducerBuilder {

    build(): kafkaProducer {
        return new TransactionManagerProducer(this);
    }

}
