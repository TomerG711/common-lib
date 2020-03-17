import {IHeaders} from "kafkajs";

export class KafkaMessage {
    public headers: IHeaders;
    public value: object;

    constructor(value: object,headers: IHeaders) {
        this.value = value;
        this.headers = headers;
    }
}