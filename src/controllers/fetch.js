const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const utility = require('../utils/helper');
const { getRabbitMQInstance } = require('../rabbitmq/index')
const { getExchangesName } = require('../rabbitmq/store/exchanges')
const routingKey = require('../rabbitmq/store/routekey')

const getNotification = catchAsync(async (req, res) => {
    const rabbitMQInstance = await getRabbitMQInstance();
    // make rpc request 
    const response = await rabbitMQInstance.rpcClient(getExchangesName('apicalls'), routingKey.fetchNotification, JSON.stringify({ notificationId: req.params.notificationId }))
    console.log("🚀 ~ getNotification ~  req.params.notificationId:", req.params.notificationId)
    if (response) {
        res.sendJSONResponse({
            code: httpStatus.OK,
            status: true,
            message: 'ok',
            data: response
        });
    }
})

const getAllNotification = catchAsync(async (req, res) => {
    const rabbitMQInstance = await getRabbitMQInstance();
    // make rpc request 
    const response = await rabbitMQInstance.rpcClient(getExchangesName('apicalls'), routingKey.fetchAllNotification, JSON.stringify(req.body))
    console.log("🚀 ~ getAllNotification ~ req.body:", req.body)

    res.sendJSONResponse({
        code: httpStatus.OK,
        status: true,
        message: 'ok',
        data: response
    });
})

module.exports = {
    getAllNotification,
    getNotification
}