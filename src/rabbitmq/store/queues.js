const config = require('../../config/config')
const queues = [
    {
        name: `apicalls-que`
    },
    {
        name: `retries.-que`
    },
    {
        name: `dlx-que`
    },
    {
        name: `email-que`
    },
    {
        name: `push-que`
    }

]

const getQueuesName = (input) => {
    let queuesName = {}
    if (input) return `${config.env}-${config.service}-${queues.filter((obj) => { return obj.name.split('-')[0] == input })[0]['name']}`
    queues.forEach((exchange) => {
        queuesName[exchange.name.split('-')[0]] = exchange.name
    })
    return queuesName
}

module.exports = { queues, getQueuesName }