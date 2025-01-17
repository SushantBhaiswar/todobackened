
const logger = require('../config/logger');
const { RabbitMQManager } = require('./manager');
const RabbitMQInitializer = require('./initializer');

let rabbitMQInstance = null;

const initializeRabbitMQ = async (config) => {
    if (rabbitMQInstance) {
        return rabbitMQInstance;
    }

    const manager = new RabbitMQManager();
    const initializer = new RabbitMQInitializer(manager, config);

    try {
        await manager.connect();
        await initializer.initialize();
        rabbitMQInstance = manager;
        return rabbitMQInstance;
    } catch (error) {
        throw error;
    }
};

const getRabbitMQInstance = async (config) => {
    if (!rabbitMQInstance) {
        rabbitMQInstance = await initializeRabbitMQ(config)
    }
    return rabbitMQInstance;
};

module.exports = {
    initializeRabbitMQ,
    getRabbitMQInstance
};
