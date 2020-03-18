import {logLevel} from "kafkajs";
import {AbstractKafkaConsumer} from "./abstacrtConsumer";
import {TransactionManagerCaster} from "../../caster/transactionManagerCaster";

export class TransactionManagerConsumer extends AbstractKafkaConsumer {
    public constructor(logLevel: logLevel, clientId: string, groupId: string, topic: string, brokers: string[]) {
        super(logLevel, clientId, groupId, topic, brokers);
        this.caster = new TransactionManagerCaster();
    }

}