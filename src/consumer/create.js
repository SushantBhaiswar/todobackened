const { getRabbitMQInstance } = require('../rabbitmq');
const { getQueuesName } = require('../rabbitmq/store/queues');
const { getExchangesName } = require('../rabbitmq/store/exchanges');
const { notificationService } = require('../services/')
const routingkey = require("../rabbitmq/store/routekey")

const consumeMessages = async () => {
    const rabbitMQInstance = await getRabbitMQInstance();
    try {

        const queue = getQueuesName('org');
        const exchange = getExchangesName('org');

        // conumer to create and send notification  
        rabbitMQInstance.consume(queue['createNotification'], async (msg) => {
            const request = JSON.parse(msg.content.toString());
            try {
                let createdNotfication = await notificationService.createNotification(request)

                // send notification according to channel
                if (createdNotfication.channel == 'email') {
                    rabbitMQInstance.publish(exchange['sendnotifications'], routingkey.email, JSON.stringify(createdNotfication))
                }
                if (createdNotfication.channel == 'push') {
                    rabbitMQInstance.publish(exchange['sendnotifications'], routingkey.push, JSON.stringify(createdNotfication))

                }
                if (createdNotfication.channel == 'sms') {
                    rabbitMQInstance.publish(exchange['sendnotifications'], routingkey.push, JSON.stringify(createdNotfication))

                }

                // Send the response back to the reply queue
                msg.channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify({ message: 'notification created' })),
                    { correlationId: msg.properties.correlationId }
                );

            } catch (processingError) {
                console.error('Error processing message:', processingError);
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
