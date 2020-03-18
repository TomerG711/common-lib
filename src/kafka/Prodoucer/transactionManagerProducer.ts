import {logLevel, SASLOptions} from "kafkajs";
import {AbstractKafkaProducer} from "./abstractProducer";
import {TransactionManagerCaster} from "../../caster/transactionManagerCaster";

export class TransactionManagerProducer extends AbstractKafkaProducer {
    public constructor(logLevel: logLevel, clientId: string, topic: string, brokers: string[], saslConfig?: SASLOptions) {
        super(logLevel, clientId, topic, brokers, saslConfig);
        this.caster = new TransactionManagerCaster()
    }

}