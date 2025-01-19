const { getRabbitMQInstance } = require('../rabbitmq');
const { getQueuesName } = require('../rabbitmq/store/queues');
const { notificationService } = require('../services/')

const consumeMessages = async () => {
    const rabbitMQInstance = await getRabbitMQInstance();
    try {

        const queue = getQueuesName('org');

        rabbitMQInstance.consume(queue['email'], async (msg) => {
            try {

                await notificationService.sendNotification(msg.content)

            } catch (processingError) {
                await rabbitMQInstance.retry(msg, notificationService.updateNotification, processingError)
            }
        });

        // conumer to send push notification
        rabbitMQInstance.consume(queue['push'], async (msg) => {
            try {

                await notificationService.sendNotification(msg.content)

            } catch (processingError) {
                rabbitMQInstance.retry(msg, notificationService.updateNotification, processingError)

            }
        });

        // conumer to send sms
        rabbitMQInstance.consume(queue['push'], async (msg) => {
            try {

                await notificationService.sendNotification(msg.content)

            } catch (processingError) {
                rabbitMQInstance.retry(msg, notificationService.updateNotification, processingError)

            }
        });


    } catch (error) {
        console.error('Error in consumeMessages:', error);
        throw error;
    }
};

module.exports = {
    consumeMessages
};
