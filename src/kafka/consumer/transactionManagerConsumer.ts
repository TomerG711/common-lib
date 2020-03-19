import {KafkaConsumer} from "./kafkaConsumer";
import {TransactionManagerCaster} from "../../caster/transactionManagerCaster";
import {TransactionManagerConsumerBuilder} from "./builder/transactionManagerConsumerBuilder";

export class TransactionManagerConsumer extends KafkaConsumer {
    public constructor(transactionManagerConsumerBuilder: TransactionManagerConsumerBuilder) {
        super(transactionManagerConsumerBuilder);
        this.caster = new TransactionManagerCaster();
    }

}