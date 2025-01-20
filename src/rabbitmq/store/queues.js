const config = require('../../config/config')
const queues = [
    {
        name: `createTask-que`
    },
    {
        name: `deleteTask-que`
    },
    {
        name: `updateTask-que`
    },
    {
        name: `fetchTask-que`
    }

]

const getQueuesName = (input) => {
    let queuesName = {}
    if (input == 'org') {
        queues.forEach((queue) => {
            queuesName[queue.name.split('-')[0]] = `${config.env}-${queue.name}`
        })
        return queuesName

    }
    if (input) return `${config.env}-${queues.filter((obj) => { return obj.name.split('-')[0] == input })?.[0]?.['name']}`

    queues.forEach((queue) => {
        queuesName[queue.name.split('-')[0]] = queue.name
    })

    return queuesName
}

module.exports = { queues, getQueuesName }