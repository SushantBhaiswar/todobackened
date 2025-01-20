const mongoose = require('mongoose');
const schemaNames = require('../config/schemaNames');

const taskSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['InProgress', 'Completed'],
        default: 'InProgress',
        index: true
    },
    dueDate: {
        type: Date,
    },
},
    {
        timestamps: true,
    }
);

taskSchema.index({ createdAt: -1, status: 1 });

const tasks = mongoose.model(schemaNames.TASK, taskSchema);

module.exports = tasks;