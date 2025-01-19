const { mongoose } = require('../config/config')
const db = require('../models')

const fetchNotificationById = async (notificationId) => {
    console.log("🚀 ~ fetchNotificationById ~ notificationId:", notificationId)
    const foundRecord = await db.NOTIFICATION.findOne({ _id: notificationId }).lean()
    return foundRecord
}

const fetchAllNotification = async (request) => {
    const { userId, cursor, limit = 10 } = request;

    const basePipeline = [
        {
            $match: { userId }
        }
    ]
    // Add cursor 
    if (cursor) {
        const [cursorDate, cursorId] = cursor.split('_');
        pipeline.push({
            $match: {
                $or: [
                    { createdAt: { $lt: new Date(cursorDate) } },
                    {
                        createdAt: new Date(cursorDate),
                        _id: { $lt: mongoose.Types.ObjectId(cursorId) },
                    },
                ],
            },
        });
    }

    // add sorting
    basePipeline.push({
        $sort: { createdAt: -1, _id: -1 },
    },)

    // ad limit
    basePipeline.push({ $limit: limit + 1 });


    const notifications = await db.NOTIFICATION.aggregate(basePipeline)

    const lastNotification =
        notifications.length > 0
            ? notifications[notifications.length - 1]
            : null;

    const nextCursor = lastNotification
        ? `${lastNotification.createdAt.toISOString()}_${lastNotification._id}`
        : null;

    return {
        data: notifications,
        nextCursor,
    }
}


module.exports = {
    fetchNotificationById,
    fetchAllNotification
}