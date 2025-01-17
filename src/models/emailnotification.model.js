const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schemaNames = require('../config/schemaNames');

const emailnotification = mongoose.Schema({
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
    }

},
    {
        timestamps: true,
    }
);

emailnotification.index({ userId: 1, status: 1 });
emailnotification.index({ createdAt: -1, status: 1 });

const Emailnotifications = mongoose.model(schemaNames.EMAILNOTIFICATION, emailnotification);

module.exports = Emailnotifications;