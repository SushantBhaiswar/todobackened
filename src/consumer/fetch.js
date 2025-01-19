const { getRabbitMQInstance } = require('../rabbitmq');
const { getQueuesName } = require('../rabbitmq/store/queues');
const { fetchService } = require('../services/')

const consumeMessages = async () => {
    const rabbitMQInstance = await getRabbitMQInstance();
    try {

        const queue = getQueuesName('org');
        //consumer to fetch notification
        rabbitMQInstance.consume(queue['fetchNotification'], async (msg) => {
            try {
                const notification = await fetchService.fetchNotificationById(JSON.parse(msg.content).notificationId)

                msg.channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify(notification)),
                    { correlationId: msg.properties.correlationId }
                );
            } catch (processingError) {
                console.log("🚀 ~ rabbitMQInstance.consume ~ processingError:", processingError)
            }
        });

        // conumer to fetch all notification
        rabbitMQInstance.consume(queue['fetchAllNotification'], async (msg) => {
            try {
                const notifications = await fetchService.fetchAllNotification(JSON.parse(msg.content))

                msg.channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify({ notifications: notifications })),
                    { correlationId: msg.properties.correlationId }
                );

            } catch (processingError) {
                console.log("🚀 ~ rabbitMQInstance.consume ~ processingError:", processingError)

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
