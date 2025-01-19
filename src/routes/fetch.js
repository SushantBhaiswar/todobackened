const express = require('express');
const { fetch } = require('../controllers');
const validate = require('../middlewares/validate');
const router = express.Router();
const { notificationValidation } = require('../validations/');


router
    .route('/:notificationId')
    .get(validate(notificationValidation.fetchNotificationById), fetch.getNotification)
router
    .route('/')
    .post(validate(notificationValidation.fetchAllNotification), fetch.getAllNotification)

module.exports = router;