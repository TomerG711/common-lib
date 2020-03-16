import {KafkaEvent} from "./kafkaEvent";

export class ServiceEvent extends KafkaEvent {

    private result: Result;

    public constructor(transactionId: string, stepName: string, data: object, result: Result) {
        super(transactionId, stepName, data);
        this.result = result;
    }
}

export class Result {

    private status: ResultStatus;
    private data: object;

    public constructor(status: ResultStatus, data: object) {
        this.status = status;
        this.data = data;
    }
}

export enum ResultStatus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}
