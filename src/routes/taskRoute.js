const express = require('express');
const { todoController } = require('../controllers');
const validate = require('../middlewares/validate');
const router = express.Router();
const { taskValidation } = require('../validations');


router
    .route('/create')
    .post(validate(taskValidation.createTask), todoController.createTask)

router
    .route('/fetch')
    .post(validate(taskValidation.fetchTask), todoController.fetchTask)

router
    .route('/:taskId')
    .delete(validate(taskValidation.deleteTask), todoController.deleteTask)
    .put(validate(taskValidation.updateTask), todoController.updateTask)
    .patch(validate(taskValidation.completeTask), todoController.completeTask)



module.exports = router;