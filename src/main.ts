import {logLevel, SASLMechanism} from "kafkajs";
import {Result, ResultStatus, ServiceEvent} from "./models/event/serviceEvent";
import {IceCubeEvent} from "./models/event/iceCubeEvent";
import {ServiceEventProducerBuilder} from "./kafka/prodoucer/builder/serviceEventProducerBuilder";
import {TransactionManagerConsumerBuilder} from "./kafka/consumer/builder/transactionManagerConsumerBuilder";

async function main() {
    let saslMechanism = {mechanism: 'scram-sha-256' as SASLMechanism, username: 'admin', password: 'admin-secret'};
    let brokers = ['onmydick.com:9092'];
    let producerBuilder = new ServiceEventProducerBuilder();
    let producer = producerBuilder.setBrokers(brokers).setClientId('test-client').setLogLevel(logLevel.INFO).setTopic('test').setTransactionalId('id').setSASLOptions(saslMechanism).build();
    let message = new ServiceEvent('1', 'testStep', {'some-key': 'some-value'},
        new Result(ResultStatus.SUCCESS, {'some-data': 'data'}), 'testService', 'operation-test');
    await producer.sendMessage(message);
    let consumerBuilder = new TransactionManagerConsumerBuilder();
    let consumer = consumerBuilder.setBrokers(brokers).setClientId('test-client').setLogLevel(logLevel.INFO).setTopic('test').setSASLOptions(saslMechanism).setGroupId('test-group').build();
    await consumer.getMessage(callback);
    message = new ServiceEvent('2', 'testStep2', {'some-key2': 'some-value2'},
        new Result(ResultStatus.SUCCESS, {'some-data': 'data'}), 'testService', 'operation-test');
    await producer.sendMessage(message);
}

function callback(serviceEvent: IceCubeEvent) {
    console.log("in callback");
    console.log(serviceEvent);
}

(async function () {
    await main();
})();