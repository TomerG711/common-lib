import {logLevel, SASLOptions} from "kafkajs";
import {Result, ResultStatus, ServiceEvent} from "./models/event/serviceEvent";
import {IceCubeEvent} from "./models/event/iceCubeEvent";
import {ServiceEventProducerBuilder} from "./kafka/producer/builder/serviceEventProducerBuilder";
import {TransactionManagerConsumerBuilder} from "./kafka/consumer/builder/transactionManagerConsumerBuilder";
import {Session} from "./models/session/session";

async function main() {
    let saslOptions: SASLOptions = {mechanism: 'scram-sha-256', username: 'admin', password: 'admin-secret'};
    let brokers = ['onmydick.com:9092'];
    let producerBuilder = new ServiceEventProducerBuilder();
    let producer = producerBuilder.setBrokers(brokers).setClientId('test-client').setLogLevel(logLevel.INFO).setRequestTimeout(30000).setTopic('test').setTransactionalId('id').setSASLOptions(saslOptions).build();
    let message = new ServiceEvent('1', 'testStep', {'some-key': 'some-value'},
        new Result(ResultStatus.SUCCESS, {'some-data': 'data'}), 'testService', 'operation-test');
    await producer.sendMessage(message);
    let consumerBuilder = new TransactionManagerConsumerBuilder();
    let consumer = consumerBuilder.setBrokers(brokers).setClientId('test-client').setLogLevel(logLevel.INFO).setTopic('test').setSASLOptions(saslOptions).setGroupId('test-group').build();
    await consumer.getMessage(callback);
    message = new ServiceEvent('2', 'testStep2', {'some-key2': 'some-value2'},
        new Result(ResultStatus.SUCCESS, {'some-data': 'data'}), 'testService', 'operation-test');
    await producer.sendMessage(message);
}

async function callback(session: Session) {
    try {
        let serviceEvent: IceCubeEvent = session.getEvent();
        console.log(serviceEvent);
        await session.commit();
    } catch (e) {
        session.rollback();
    }
}

(async function () {
    await main();
})();