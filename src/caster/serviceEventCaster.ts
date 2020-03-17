import {Result, ServiceEvent} from "../models/event/serviceEvent";
import {Caster} from "./caster";
import {KafkaMessage} from "../models/message/kafkaMessage";
import {IHeaders} from "kafkajs";

export class ServiceEventCaster implements Caster {

    iceCubeEventToKafkaMessage(serviceEvent: ServiceEvent): KafkaMessage {
        let headers: IHeaders = {
            serviceName: serviceEvent.serviceName,
            operation: serviceEvent.operation
        };
        let value = {
            "transactionId": serviceEvent.transactionId,
            "stepName": serviceEvent.stepName,
            "data": serviceEvent.data,
            "result": serviceEvent.result
        };
        return new KafkaMessage(value, headers);
    }

    kafkaMessageToIceCubeEvent(kafkaMessage: KafkaMessage): ServiceEvent {
        let transactionId = kafkaMessage.value["transactionId"];
        let stepName = kafkaMessage.value["stepName"];
        let data = kafkaMessage.value["data"];
        let result: Result = kafkaMessage.value["result"];
        let serviceName = kafkaMessage.headers["serviceName"];
        let operation = kafkaMessage.headers["operation"];
        return new ServiceEvent(transactionId, stepName, data, result, serviceName, operation);
    }


}