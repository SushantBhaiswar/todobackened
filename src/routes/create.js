const express = require('express');
const { create } = require('../controllers');
const validate = require('../middlewares/validate');
const router = express.Router();
const { authValidation } = require('../validations/');


router
    .route('/')
    .get(/*validate(authValidation.login),*/ create.conditionalNotification)

module.exports = router;