const config = require('../../config/config')

const exchanges = [

    {
        name: `apicalls-exc`,
        type: 'topic'
    },
]

const getExchangesName = (input) => {
    let exchangesName = {}
    if (input == 'org') {
        exchanges.forEach((exchange) => {
            exchangesName[exchange.name.split('-')[0]] = `${config.env}-${exchange.name}`
        })
        return exchangesName
    }
    if (input) return `${config.env}-${exchanges.filter((obj) => { return obj.name.split('-')[0] == input })[0]['name']}`

    exchanges.forEach((exchange) => {
        exchangesName[exchange.name.split('-')[0]] = exchange.name
    })

    return exchangesName
}
module.exports = { exchanges, getExchangesName }