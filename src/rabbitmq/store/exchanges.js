const config = require('../../config/config')

const exchanges = [
    {
        name: `sendnotifications-exc`,
        type: 'topic'
    },
    {
        name: `apicalls-exc`,
        type: 'topic'
    },
    {
        name: `retries-exc`,
        type: 'topic'
    },
    {
        name: `dlx-exc`,
        type: 'topic'
    }
]

const getExchangesName = (input) => {
    let exchangesName = {}
    if (input) return `${config.env}-${config.service}-${exchanges.filter((obj) => { return obj.name.split('-')[0] == input })[0]['name']}`
    exchanges.forEach((exchange) => exchangesName[exchange.name.split('-')[0]] = exchange.name)
    return exchangesName
}
module.exports = { exchanges, getExchangesName }