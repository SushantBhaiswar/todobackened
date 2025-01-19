const create = require('./create')
const notification = require('./notification')
const fetch = require('./fetch')

const initializeConsumer = async () => {
    try {
        await create.consumeMessages();
        await notification.consumeMessages();
        await fetch.consumeMessages();
        console.log('Consumer initialized and waiting for messages...');
    } catch (error) {
        console.error('Error initializing the consumer:', error);
    }
};

module.exports = {
    initializeConsumer
}