import {logLevel, SASLOptions} from "kafkajs";
import {AbstractKafkaConsumer} from "./abstacrtConsumer";
import {TransactionManagerCaster} from "../../caster/transactionManagerCaster";

export class TransactionManagerConsumer extends AbstractKafkaConsumer {
    public constructor(logLevel: logLevel, clientId: string, groupId: string, topic: string, brokers: string[], saslConfig?: SASLOptions) {
        super(logLevel, clientId, groupId, topic, brokers, saslConfig);
        this.caster = new TransactionManagerCaster();
    }

}