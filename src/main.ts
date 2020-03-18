//13.90.42.100:9092
//topic name: test
// username="admin"
// password="admin-secret"

import {ServiceEventProducer} from "./kafka/Prodoucer/serviceEventProducer";
import {logLevel, SASLMechanism} from "kafkajs";
import {Result, ResultStatus, ServiceEvent} from "./models/event/serviceEvent";
import {TransactionManagerConsumer} from "./kafka/Consumer/transactionManagerConsumer";
import {IceCubeEvent} from "./models/event/iceCubeEvent";

async function main() {
    let saslMechanism = {mechanism: 'scram-sha-256' as SASLMechanism, username: 'admin', password: 'admin-secret'};
    let brokers = ['13.90.42.100:9092'];
    let producer = new ServiceEventProducer(logLevel.DEBUG, 'test-client', 'test', brokers, saslMechanism);
    //transactionId: string, stepName: string, data: object, serviceName: string, operation: string
    let message = new ServiceEvent('1', 'testStep', {'some-key': 'some-value'},
        new Result(ResultStatus.SUCCESS, {'some-data': 'data'}), 'testService', 'operation-test');
    await producer.sendMessage(message);
    let consumer = new TransactionManagerConsumer(logLevel.DEBUG, 'test-client', 'test-group',
        'test', brokers, saslMechanism);
    await consumer.getMessage(callback);
}

function callback(serviceEvent: IceCubeEvent) {
    console.log(serviceEvent);
}

(async function () {
    await main();
})();