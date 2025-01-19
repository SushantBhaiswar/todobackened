const db = require('../models')

const createNotification = async (request) => {

    const createdRecord = await db.NOTIFICATION.create(request)
    return JSON.parse(JSON.stringify(createdRecord))
}

const updateNotification = async (request) => {
    console.log("🚀 ~ updateNotification ~ request:", request)

    const updatedRecord = await db.NOTIFICATION.findByIdAndUpdate(
        request._id,
        { $set: request },
        { new: true }
    );
    return JSON.parse(JSON.stringify(updatedRecord))
}

const sendNotification = async (request) => {
    if (Math.random() * 1 > 0.5) {
        throw new Error('Error while processing notification')
    }
    await updateNotification({ ...request, status: 'sent' })
}

module.exports = {
    createNotification,
    updateNotification,
    sendNotification
}