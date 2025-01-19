const config = require('../../config/config')
const queues = [
    {
        name: `createNotification-que`
    },

    {
        name: `fetchNotification-que`
    },

    {
        name: `fetchAllNotification-que`
    },

    {
        name: `email-que`,
        options: {

        }
    },
    {
        name: `push-que`,
        options: {

        }
    },
    {
        name: `sms-que`,
        options: {

        }
    }

]

const getQueuesName = (input) => {
    let queuesName = {}
    if (input == 'org') {
        queues.forEach((queue) => {
            queuesName[queue.name.split('-')[0]] = `${config.env}-${config.service}-${queue.name}`
        })
        return queuesName

    }
    if (input) return `${config.env}-${config.service}-${queues.filter((obj) => { return obj.name.split('-')[0] == input })?.[0]?.['name']}`

    queues.forEach((queue) => {
        queuesName[queue.name.split('-')[0]] = queue.name
    })

    return queuesName
}

module.exports = { queues, getQueuesName }