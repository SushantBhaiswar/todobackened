const mongoose = require('mongoose');
const schemaNames = require('../config/schemaNames');

const pushnotification = mongoose.Schema({
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
    retryCount: {
        type: Number,
        default: 0
    },
    retriedAt: {
        type: Date
    },
},
    {
        timestamps: true,
    }
);

pushnotification.index({ userId: 1, status: 1 });
pushnotification.index({ createdAt: -1, status: 1 });

const Pushnotifications = mongoose.model(schemaNames.PUSHNOTIFICATION, pushnotification);

module.exports = Pushnotifications;