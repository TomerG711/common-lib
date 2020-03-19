import {KafkaConsumerBuilder} from "./kafkaConsumerBuilder";
import {KafkaConsumer} from "../kafkaConsumer";
import {TransactionManagerConsumer} from "../transactionManagerConsumer";

export class TransactionManagerConsumerBuilder extends KafkaConsumerBuilder {
    build(): KafkaConsumer {
        return new TransactionManagerConsumer(this);
    }

}