import {logLevel} from "kafkajs";
import {AbstractKafkaProducer} from "./abstractProducer";
import {TransactionManagerCaster} from "../../eventSchemas/Caster/transactionManagerCaster";

export class TransactionManagerProducer extends AbstractKafkaProducer {
    public constructor(logLevel: logLevel, clientId: string, topic: string, brokers: string[]) {
        super(logLevel, clientId, topic, brokers);
        this.caster = new TransactionManagerCaster()
    }

}