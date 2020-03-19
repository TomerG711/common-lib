import {logLevel, SASLOptions} from "kafkajs";
import {AbstractKafkaProducer} from "./abstractProducer";
import {TransactionManagerCaster} from "../../caster/transactionManagerCaster";

export class TransactionManagerProducer extends AbstractKafkaProducer {
    /**
     *
     * @param logLevel KafkaJS log level
     * @param clientId
     * @param topic
     * @param brokers
     * @param transactionalId -  Unique ID for producer
     * @param saslConfig
     */
    public constructor(logLevel: logLevel, clientId: string, topic: string, brokers: string[], transactionalId: string, saslConfig?: SASLOptions) {
        super(logLevel, clientId, topic, brokers, transactionalId, saslConfig);
        this.caster = new TransactionManagerCaster()
    }

}