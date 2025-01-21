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

const completeTask = async (request) => {
    const createdRecord = await db.TASK.updateOne({ _id: request.taskId }, { $set: { status: 'completed' } })
    return JSON.parse(JSON.stringify(createdRecord))
}

const deleteTask = async (request) => {
    const createdRecord = await db.TASK.deleteOne({ _id: request.taskId })
    return JSON.parse(JSON.stringify(createdRecord))
}

const fetchTasks = async (request) => {
    const { userId, filter, cursor, limit = 10 } = request;

    const basePipeline = [
        {
            $match: {}
        }
    ]
    // apply filter
    if (filter && filter != 'all') {

        if (filter == 'today') {
            basePipeline.push({
                $match: {
                    $expr: {
                        $eq: [
                            {
                                $dateTrunc: {
                                    date: "$dueDate",
                                    unit: "day"
                                }
                            },
                            {
                                $dateTrunc: {
                                    date: new Date(),
                                    unit: "day"
                                }
                            }
                        ]
                    }
                }
            })
        } else {
            basePipeline[0]['$match']['status'] = filter == 'pending' ? 'InProgress' : filter
        }
    }
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

    let tasksCountPipeline = []
    let tasksPipeline = []

    // count filtered document
    tasksPipeline.push({ $count: "size" })

    // add limit
    tasksPipeline.push({ $limit: limit + 1 });

    // add facet for paralle processing
    basePipeline.push({ $facet: { tasksCount: tasksCountPipeline, tasks: tasksPipeline } })

    const mainProject = {
        $project: {
            tasksCount: { $arrayElemAt: ['$docCount.size', 0] }
        }
    }
    // final project
    basePipeline.push(mainProject)

    let { tasksCount, tasks } = await db.TASK.aggregate(basePipeline) || {}

    // find next cursor
    const lastTask =
        tasks.length > limit
            ? tasks[tasks.length - 1]
            : null;

    const nextCursor = lastTask
        ? `${lastTask.createdAt.toISOString()}_${lastTask._id}`
        : null;


    // remove extra notification if fetched
    if (tasks.length > limit) tasks.pop()
    return {
        data: tasks,
        nextCursor,
        totalCount: tasksCount
    }
}


module.exports = {
    createTask,
    updateTask,
    fetchTasks,
    deleteTask,
    completeTask
}