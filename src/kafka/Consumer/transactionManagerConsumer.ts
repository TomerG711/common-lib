import {logLevel} from "kafkajs";
import {AbstractKafkaConsumer} from "./abstacrtConsumer";
import {TransactionManagerCaster} from "../../caster/transactionManagerCaster";

export class TransactionManagerConsumer extends AbstractKafkaConsumer {
    public constructor(logLevel: logLevel, groupId: string, topic: string, brokers: string[]) {
        super(logLevel, groupId, topic, brokers);
        this.caster = new TransactionManagerCaster();
    }

}