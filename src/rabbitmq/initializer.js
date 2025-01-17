const { exchanges } = require('./store/exchanges');

const { queues } = require('./store/queues');
const { bindExcAndQue } = require('./store/binding');

class RabbitMQInitializer {
  constructor(manager, config) {
    this.manager = manager;
    this.config = config;
    this.initPromise = null;
  }
  // meimoze promise
  async initialize() {
    if (this.initPromise) return this.initPromise;

    this.initPromise = this._initialize();
    return this.initPromise;
  }

  async _initialize() {
    try {
      await this.initializeExchanges();
      await this.initializeQueues();
      await this.bindQueuesAndExchanges();
    } catch (error) {

      throw error;
    }
  }

  async initializeExchanges() {
    await Promise.all(exchanges.map(async (exchange) => {
      const name = this.formatName(exchange.name);
      await this.manager.createExchange(name, exchange.type, exchange.options);
    }));
  }

  async initializeQueues() {
    await Promise.all(queues.map(async (queue) => {
      const name = this.formatName(queue.name);
      await this.manager.createQueue(name, queue.options);
    }));
  }

  async bindQueuesAndExchanges() {
    await Promise.all(bindExcAndQue.map(async (binding) => {
      const queueName = this.formatName(binding.queueName);
      const exchangeName = this.formatName(binding.exchangeName);
      await this.manager.bindQueue(queueName, exchangeName, binding.routingkey);
    }));
  }

  formatName(name) {
    return `${this.config.env}-${this.config.service}-${name}`;
  }
}

module.exports = RabbitMQInitializer