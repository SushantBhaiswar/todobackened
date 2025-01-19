const routingkey = require("./routekey")
const { getQueuesName } = require('./queues')
const { getExchangesName } = require('./exchanges')
const bindExcAndQue = [
    //original
    {
        queueName: getQueuesName()?.['email'],
        exchangeName: getExchangesName()?.['sendnotifications'],
        routingkey: routingkey.email
    },
    {
        queueName: getQueuesName()?.['push'],
        exchangeName: getExchangesName()?.['sendnotifications'],
        routingkey: routingkey.push
    },
    {
        queueName: getQueuesName()?.['sms'],
        exchangeName: getExchangesName()?.['sendnotifications'],
        routingkey: routingkey.sms
    },
    //retry 
    {
        queueName: getQueuesName()?.['email'],
        exchangeName: getExchangesName()?.['retry'],
        routingkey: routingkey.email
    },
    {
        queueName: getQueuesName()?.['push'],
        exchangeName: getExchangesName()?.['retry'],
        routingkey: routingkey.push
    },
    {
        queueName: getQueuesName()?.['sms'],
        exchangeName: getExchangesName()?.['retry'],
        routingkey: routingkey.sms
    },
    //api calls
    {
        queueName: getQueuesName()?.['createNotification'],
        exchangeName: getExchangesName()?.['apicalls'],
        routingkey: routingkey.createNotification
    },
    {
        queueName: getQueuesName()?.['fetchNotification'],
        exchangeName: getExchangesName()?.['apicalls'],
        routingkey: routingkey.fetchNotification
    },
    {
        queueName: getQueuesName()?.['fetchAllNotification'],
        exchangeName: getExchangesName()?.['apicalls'],
        routingkey: routingkey.fetchAllNotification
    },
   
]

module.exports = { bindExcAndQue }