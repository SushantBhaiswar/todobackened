const tasks = require('./task')

const initializeConsumer = async () => {
    try {
        await tasks.consumeMessages();
    } catch (error) {
        console.error('Error initializing the consumer:', error);
    }
};

module.exports = {
    initializeConsumer
}