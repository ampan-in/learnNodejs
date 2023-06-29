const  express = require('express')
const router = express.Router()
const middleware = require('../middlewares/users')
const controller = require('../controllers/users')

router.post('/users', middleware.validateCreateUser, controller.createUsers)
router.get('/users', controller.listUsers)
router.delete('/users/:userID',controller.deleteUsers)
router.put('/users/:userID', middleware.validateUpdateUser,controller.updateUsers)

module.exports = router;