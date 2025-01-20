const routingkey = require("./routekey")
const { getQueuesName } = require('./queues')
const { getExchangesName } = require('./exchanges')
const bindExcAndQue = [

    //api calls
    {
        queueName: getQueuesName()?.['createTask'],
        exchangeName: getExchangesName()?.['apicalls'],
        routingkey: routingkey.createTask
    },
    {
        queueName: getQueuesName()?.['fetchTask'],
        exchangeName: getExchangesName()?.['apicalls'],
        routingkey: routingkey.fetchTask
    },
    {
        queueName: getQueuesName()?.['updateTask'],
        exchangeName: getExchangesName()?.['apicalls'],
        routingkey: routingkey.updateTask
    },
    {
        queueName: getQueuesName()?.['completeTask'],
        exchangeName: getExchangesName()?.['apicalls'],
        routingkey: routingkey.completeTask
    },
    {
        queueName: getQueuesName()?.['deleteTask'],
        exchangeName: getExchangesName()?.['apicalls'],
        routingkey: routingkey.deleteTask
    },

]

module.exports = { bindExcAndQue }