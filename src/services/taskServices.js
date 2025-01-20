const mongoose = require('mongoose')
const db = require('../models')

const createTask = async (request) => {
    const createdRecord = await db.TASK.create(request)
    return JSON.parse(JSON.stringify(createdRecord))
}

const updateTask = async (request) => {
    const createdRecord = await db.TASK.updateOne({ _id: request.taskId }, { $set: { ...request } })
    return JSON.parse(JSON.stringify(createdRecord))
}

const deleteTask = async (request) => {
    const createdRecord = await db.TASK.deleteOne({ _id: request.taskId })
    return JSON.parse(JSON.stringify(createdRecord))
}

const fetchTasks = async (request) => {
    const { userId, cursor, limit = 10 } = request;

    const basePipeline = [
        {
            $match: { userId }
        }
    ]
    // Add cursor 
    if (cursor) {
        const [cursorDate, cursorId] = cursor.split('_');
        basePipeline.push({
            $match: {
                $or: [
                    { createdAt: { $lte: new Date(cursorDate) } },
                    {
                        createdAt: new Date(cursorDate),
                        _id: { $lte: new mongoose.Types.ObjectId(cursorId) },
                    },
                ],
            },
        });
    }

    // add sorting
    basePipeline.push({
        $sort: { createdAt: -1, _id: -1 },
    },)

    // ads limit
    basePipeline.push({ $limit: limit + 1 });


    const notifications = await db.TASK.aggregate(basePipeline)

    // find next cursor
    const lastNotification =
        notifications.length > limit
            ? notifications[notifications.length - 1]
            : null;

    const nextCursor = lastNotification
        ? `${lastNotification.createdAt.toISOString()}_${lastNotification._id}`
        : null;


    // remove extra notification if fetched
    if (notifications.length > limit) notifications.pop()
    return {
        data: notifications,
        nextCursor,
    }
}


module.exports = {
    createTask,
    updateTask,
    fetchTasks,
    deleteTask
}