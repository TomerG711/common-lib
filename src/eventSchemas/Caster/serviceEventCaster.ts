import {Result, ServiceEvent} from "../serviceEvent";
import {ICaster} from "./ICaster";
import {KafkaMessage} from "./kafkaMessage";

export class ServiceEventCaster implements ICaster {

    kafkaEventToKafkaMessage(kafkaEvent: ServiceEvent): KafkaMessage {
        return undefined;
    }

    kafkaMessageToKafkaEvent(kafkaMessage: KafkaMessage) : ServiceEvent{
        return undefined;
    }
}