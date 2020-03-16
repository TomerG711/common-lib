import {KafkaEvent} from "./kafkaEvent";

export class TransactionManagerEvent extends KafkaEvent {

    public constructor(transactionId: string, stepName: string, data: object) {
        super(transactionId, stepName, data);
    }

}