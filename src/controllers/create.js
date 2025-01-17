const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const utility = require('../utils/helper');
const { getRabbitMQInstance } = require('../rabbitmq/index')
const { getExchangesName } = require('../rabbitmq/store/exchanges')
const { getQueuesName } = require('../rabbitmq/store/queues')

const conditionalNotification = catchAsync(async (req, res) => {
    const rabbitMQInstance = await getRabbitMQInstance();
    console.log("log", getExchangesName('sendnotifications'))
    rabbitMQInstance.rpcClient(getExchangesName('sendnotifications'),'')
    // publish message to exchange 
    res.sendJSONResponse({
        code: httpStatus.OK,
        status: true,
        message: 'ok',
    });
})

module.exports = {
    conditionalNotification
}