# common-lib
This library will define the standard for communication between our services, from the properties of the events to the 
actual communication with Kafka.


## KafkaMessage
Representation of the actual message sent to Kafka.
KafkaMessage is built of 2 parts - the message (general object), and headers (general JSON, where each key is header name, 
and the value is the header value).

## Services separation
Any of the the following contain 2 implementations:
1. For transaction manager service
2. For the rest of the services

The main difference is the in IceCubeEvent object. 
While both of the implementations contains mainly the same properties, the events that the services send to the transaction
manager should contain results about the actions they did, and thus the 2 objects.

Therefore, we created 2 consumers and 2 producers. We have 2 kind of events, and we need to be able to do the casting between each event
and the general kafka message (of which there is only 1).

### IceCubeEvent
Representation of Kafka message for the services(for code usage).
Here we have more explicit and detailed properties of what message should contain.

#### Body

Property | Type | Description
--- | --- | ---
TransactionId | String | Unique ID for transactions
stepName | String | Current step in transaction, the action to be done 
data | object | General object of the data, should include any relevant data for the destination service

As mentioned above, there are two types - *TransactionManagerEvent*, and *ServiceEvent*.
The *ServiceEvent* contain the following property as well:

##### Result
Properties:

Property | Type | Description
--- | --- | ---
status | ResultStatus | SUCCESS/FAILED
data | object | Any relevant data about the action that was performed. For example, a UUID of created flow on NiFi. On the other hand, could be error details upon failure
  

#### Headers 
Property | Type | Description
--- | --- | ---
serviceName | String | The name of the destination service of this message 
operation | String | The operation name (for identifying the transaction)

### Producer
Produces messages to Kafka topic.
Works transactionally only, as we decided we want to be sure each message arrived to every broker.


### Consumer
Consumes messages from Kafka topic.
The consumer should get a callback listener that gets and IceCubeEvent as argument.
The consumer will convert the general KafkaMessage to specific IceCube event and will  run the given callback, for each message
received.
