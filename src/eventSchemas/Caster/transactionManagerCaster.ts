import {ICaster} from "./ICaster";
import {TransactionManagerEvent} from "../transactionManagerEvent";
import {KafkaMessage} from "./kafkaMessage";

export class TransactionManagerCaster implements ICaster{

    kafkaEventToKafkaMessage(kafkaEvent: TransactionManagerEvent): KafkaMessage {
        return undefined;
    }

    kafkaMessageToKafkaEvent(kafkaMessage: KafkaMessage) : TransactionManagerEvent{
        return undefined;
    }
}