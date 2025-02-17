const Joi = require('joi');

const createTask = {

    body: Joi.object().keys({
        title: Joi.string(),
        description: Joi.string(),
        dueDate: Joi.date(),
    }),
};

const fetchTask = {

    body: Joi.object().keys({
        cursor: Joi.string(),
        search: Joi.string(),
        limit: Joi.number(),
        filter: Joi.string().valid('today', 'pending', 'completed', 'all'),
    }),
};

const deleteTask = {

    params: Joi.object().keys({
        taskId: Joi.string(),

    }),
};

const updateTask = {

    params: Joi.object().keys({
        taskId: Joi.string(),

    }),
    body: Joi.object().keys({
        title: Joi.string(),
        dueDate: Joi.date(),
        description: Joi.string(),
    }),
};

const completeTask = {

    params: Joi.object().keys({
        taskId: Joi.string(),

    }),
};


module.exports = {
    createTask,
    fetchTask,
    deleteTask,
    updateTask,
    completeTask
}