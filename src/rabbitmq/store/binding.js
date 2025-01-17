const routingkey = require("./routekey")
const { getQueuesName } = require('./queues')
const { getExchangesName } = require('./exchanges')
const bindExcAndQue = [
    {
        queueName: getQueuesName()?.['email'],
        exchangeName: getExchangesName()?.['sendnotifications'],
        routingkey: routingkey.email
    },
    {
        queueName: getQueuesName()?.['push'],
        exchangeName: getExchangesName()?.['sendnotifications'],
        routingkey: routingkey.push
    }
]

module.exports = { bindExcAndQue }