const express = require('express');

const router = express.Router();
const taskRoutes = require('./taskRoute');


const serviceRoutes = {
    '/task': taskRoutes,
};

Object.keys(serviceRoutes).forEach((route) => {
    router.use(route, serviceRoutes[route]);
});
module.exports = router;
