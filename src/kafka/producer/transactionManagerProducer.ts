import {kafkaProducer} from "./kafkaProducer";
import {TransactionManagerCaster} from "../../caster/transactionManagerCaster";
import {TransactionManagerProducerBuilder} from "./builder/transactionManagerProducerBuilder";

export class TransactionManagerProducer extends kafkaProducer {
    /**
     *
     * @param transactionManagerProducerBuilder
     */
    public constructor(transactionManagerProducerBuilder: TransactionManagerProducerBuilder) {
        super(transactionManagerProducerBuilder);
        this.caster = new TransactionManagerCaster()
    }

}