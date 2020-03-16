export abstract class KafkaEvent {

    public transactionId: string;
    public stepName: string;
    public  data: object;


    protected constructor(transactionId: string, stepName: string, data: object) {
        this.transactionId = transactionId;
        this.stepName = stepName;
        this.data = data;
    }
}