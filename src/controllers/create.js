const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const utility = require('../utils/helper');
const { getRabbitMQInstance } = require('../rabbitmq/index')
const { getExchangesName } = require('../rabbitmq/store/exchanges')
const routingKey = require('../rabbitmq/store/routekey')

const conditionalNotification = catchAsync(async (req, res) => {
    const rabbitMQInstance = await getRabbitMQInstance();
    // make rpc request 
    const response = await rabbitMQInstance.rpcClient(getExchangesName('apicalls'), routingKey.createNotification, JSON.stringify({ ...req.body }))

    res.sendJSONResponse({
        code: httpStatus.OK,
        status: true,
        message: 'ok',
        data: response
    });
})

module.exports = {
    conditionalNotification
}