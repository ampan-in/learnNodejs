const  express = require('express')
const router = express.Router()
const middleware = require('../middlewares/review')
const controller = require('../controllers/review')

router.post('/review', middleware.validateCreateReview, controller.createReview)
router.get('/review', controller.listReview)
router.delete('/review/:reviewID ', controller.deleteReview)
router.put('/review/:reviewID ', middleware.validateCreateReview,controller.updateReview)
module.exports = router;