import {KafkaProducerBuilder} from "./kafkaProducerBuilder";
import {kafkaProducer} from "../kafkaProducer";
import {TransactionManagerProducer} from "../transactionManagerProducer";
import {TransactionManagerCaster} from "../../../caster/transactionManagerCaster";

export class TransactionManagerProducerBuilder extends KafkaProducerBuilder {

    public constructor() {
        super();
        this.caster = new TransactionManagerCaster();
    }


    build(): kafkaProducer {
        return new TransactionManagerProducer(this);
    }

}
