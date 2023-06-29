const  express = require('express')
const router = express.Router()
const middleware = require('../middlewares/products')
const controller = require('../controllers/products')

router.post('/products', middleware.validateCreateProducts, controller.createProduct)
router.get('/products', controller.listProduct)
router.delete('/products/:productID', controller.deleteProduct)
router.put('/products/:productID', middleware.validateUpdateProducts,controller.updateProduct)

module.exports = router;