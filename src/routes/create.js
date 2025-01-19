const express = require('express');
const { create } = require('../controllers');
const validate = require('../middlewares/validate');
const router = express.Router();
const { notificationValidation } = require('../validations/');


router
    .route('/')
    .post(validate(notificationValidation.createNotification), create.conditionalNotification)

module.exports = router;