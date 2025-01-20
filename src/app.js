const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const httpStatus = require('http-status');
const { authLimiter } = require('./middlewares/rateLimiter.js');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/apiError');
const app = express();

app.set('trust proxy', true)

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ limit: '0.1kb', extended: true }));

app.use(bodyParser.text({ type: 'text/plain', limit: '50mb' }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());



// limit repeated failed requests to auth endpoints
app.use('/notifications', authLimiter);

// notifications api routes
app.use('/v1', routes);


// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
// convert error to ApiError, if needed
app.use(errorConverter);

// // handle error
app.use(errorHandler);

/**
 *
 * @param {httpStatus} code
 * @param {Boolean} status
 * @param {String} message
 * @param {Object} data
 */
app.response.sendJSONResponse = function ({ code, status = true, message, data, isShowMessage = true }) {

  return this.status(code).json({ code, status, message, isShowMessage, data });
};

module.exports = app;