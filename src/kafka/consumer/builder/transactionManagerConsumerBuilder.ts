import {KafkaConsumerBuilder} from "./kafkaConsumerBuilder";
import {KafkaConsumer} from "../kafkaConsumer";
import {TransactionManagerConsumer} from "../transactionManagerConsumer";
import {TransactionManagerCaster} from "../../../caster/transactionManagerCaster";

export class TransactionManagerConsumerBuilder extends KafkaConsumerBuilder {

    public constructor() {
        super();
        this.caster = new TransactionManagerCaster();
    }

    build(): KafkaConsumer {
        return new TransactionManagerConsumer(this);
    }

}