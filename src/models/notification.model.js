const mongoose = require('mongoose');
const schemaNames = require('../config/schemaNames');

const notification = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    content: {
        title: String,
        body: String,
        data: mongoose.Schema.Types.Mixed
    },
    status: {
        type: String,
        enum: ['processing', 'sent', 'failed'],
        default: 'processing',
        index: true
    },
    channel: {
        type: String,
        enum: ['email', 'SMS', 'push'],
        index: true
    },
    retryCount: {
        type: Number,
        default: 0
    },
    retryData: [{
        count: { type: String },
        reason: { type: String },
        retriedAt: { type: Date }
    }]
},
    {
        timestamps: true,
    }
);

notification.index({ userId: 1, status: 1 });
notification.index({ createdAt: -1, status: 1 });

const notifications = mongoose.model(schemaNames.NOTIFICATION, notification);

module.exports = notifications;