const express = require('express');

const router = express.Router();

const fetchRoutes = require('./fetch');
const scheduleRoutes = require('./schedule');
const creatRoutes = require('./create');


const serviceRoutes = {
    '/create': creatRoutes,
    '/fetch': fetchRoutes,
    // '/schdeule': scheduleRoutes,
};

Object.keys(serviceRoutes).forEach((route) => {
    router.use(route, serviceRoutes[route]);
});
module.exports = router;
