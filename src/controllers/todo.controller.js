const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const utility = require('../utils/helper');
const { getRabbitMQInstance } = require('../rabbitmq/index')
const { getExchangesName } = require('../rabbitmq/store/exchanges')
const routingKey = require('../rabbitmq/store/routekey')

const createTask = catchAsync(async (req, res) => {
    const rabbitMQInstance = await getRabbitMQInstance();

    // make rpc request 
    await rabbitMQInstance.rpcClient(getExchangesName('apicalls'), routingKey.createTask, JSON.stringify({ ...req.body }))

    res.sendJSONResponse({
        code: httpStatus.OK,
        status: true,
        message: 'Task crated successfully',
    });
})

const fetchTask = catchAsync(async (req, res) => {
    const rabbitMQInstance = await getRabbitMQInstance();

    // make rpc request 
    const { response } = await rabbitMQInstance.rpcClient(getExchangesName('apicalls'), routingKey.fetchTask, JSON.stringify({ ...req.body })) || {}

    res.sendJSONResponse({
        code: httpStatus.OK,
        status: true,
        message: 'Tasks fetched successfully',
        data: { results: response?.data, cursor: response?.nextCursor }
    });
})

const updateTask = catchAsync(async (req, res) => {
    const rabbitMQInstance = await getRabbitMQInstance();

    // make rpc request 
    const response = await rabbitMQInstance.rpcClient(getExchangesName('apicalls'), routingKey.updateTask, JSON.stringify({ taskId: req.params.taskId, ...req.body }))

    res.sendJSONResponse({
        code: httpStatus.OK,
        status: true,
        message: 'Task updated successfully',
    });
})

const completeTask = catchAsync(async (req, res) => {
    const rabbitMQInstance = await getRabbitMQInstance();
    console.log("reached")
    // make rpc request 
    const response = await rabbitMQInstance.rpcClient(getExchangesName('apicalls'), routingKey.completeTask, JSON.stringify({ taskId: req.params.taskId }))

    res.sendJSONResponse({
        code: httpStatus.OK,
        status: true,
        message: 'Task completed successfully',
    });
})

const deleteTask = catchAsync(async (req, res) => {
    const rabbitMQInstance = await getRabbitMQInstance();

    // make rpc request 
    const response = await rabbitMQInstance.rpcClient(getExchangesName('apicalls'), routingKey.deleteTask, JSON.stringify({ taskId: req.params.taskId }))

    res.sendJSONResponse({
        code: httpStatus.OK,
        status: true,
        message: 'Task deleted successfully',
    });
})

module.exports = {
    createTask,
    fetchTask,
    updateTask,
    deleteTask,
    completeTask
}