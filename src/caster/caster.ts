import {IceCubeEvent} from "../models/event/iceCubeEvent";
import {KafkaMessage} from "../models/message/kafkaMessage";

export interface Caster {

    iceCubeEventToKafkaMessage(iceCubeEvent: IceCubeEvent): KafkaMessage;

    kafkaMessageToIceCubeEvent(kafkaMessage: KafkaMessage): IceCubeEvent;
}