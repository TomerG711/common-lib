import {KafkaEvent} from "../kafkaEvent";
import {KafkaMessage} from "./kafkaMessage";

export interface ICaster {
    kafkaEventToKafkaMessage(kafkaEvent:KafkaEvent) : KafkaMessage;
    kafkaMessageToKafkaEvent(kafkaMessage: KafkaMessage): KafkaEvent;
}