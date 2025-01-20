const { getRabbitMQInstance } = require('../rabbitmq');
const { getQueuesName } = require('../rabbitmq/store/queues');
const { taskServices } = require('../services/')

const consumeMessages = async () => {
    const rabbitMQInstance = await getRabbitMQInstance();
    try {

        const queue = getQueuesName('org');

        // conumer to create task
        rabbitMQInstance.consume(queue['createTask'], async (msg) => {
            const request = JSON.parse(msg.content.toString());
            try {
                await taskServices.createTask(request)

                // Send the response back to the reply queue
                msg.channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify({ message: 'Task created' })),
                    { correlationId: msg.properties.correlationId }
                );

            } catch (processingError) {
                console.error('Error processing message:', processingError);
            }
        });

        // conumer to fetch task
        rabbitMQInstance.consume(queue['fetchTask'], async (msg) => {
            const request = JSON.parse(msg.content.toString());
            try {
                let response = await taskServices.fetchTasks(request)

                // Send the response back to the reply queue
                msg.channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify({ response })),
                    { correlationId: msg.properties.correlationId }
                );

            } catch (processingError) {
                console.error('Error processing message:', processingError);
            }
        });

        // conumer to delete task
        rabbitMQInstance.consume(queue['deleteTask'], async (msg) => {
            const request = JSON.parse(msg.content.toString());
            try {
                await taskServices.deleteTask(request)

                // Send the response back to the reply queue
                msg.channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify({ message: 'Task deleted' })),
                    { correlationId: msg.properties.correlationId }
                );

            } catch (processingError) {
                console.error('Error processing message:', processingError);
            }
        });

        // conumer to update task
        rabbitMQInstance.consume(queue['updateTask'], async (msg) => {
            const request = JSON.parse(msg.content.toString());
            try {
                await taskServices.updateTask(request)

                // Send the response back to the reply queue
                msg.channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify({ message: 'Task updated' })),
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
