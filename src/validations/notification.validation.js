const Joi = require('joi');


const createNotification = {

    body: Joi.object().keys({
        userId: Joi.string().required(),
        content: Joi.object().required(),
        channel: Joi.string().valid('sms', 'email', 'push')
    }),
};

const fetchNotificationById = {
    params: Joi.object().keys({
        notificationId: Joi.string().required(),
    }),
};

const fetchAllNotification = {
    body: Joi.object().keys({
        userId: Joi.string().required(),
        cursor: Joi.string(),
        limit: Joi.string(),
    }),
};


module.exports = {
    createNotification,
    fetchNotificationById,
    fetchAllNotification,
}