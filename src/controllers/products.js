const { validationResult } = require('express-validator');
const db = require('../config/database')
const today = new Date();

const createProduct = (req, res) => {
	const errors = validationResult(req)

	if(!errors.isEmpty()){
		return res.status(500).json({ errors: errors.array() })
	}
    
	const { name, description, price } = req.body

	db('products')
		.insert({ name, description, price, createdAt:today })
        //ถ้าสำเร็จ
        .then(() => {
			res.status(200).json({ message: 'product created successfully' });
		})
        //ถ้าไม่สำเร็จ
		.catch((error) => {
			res.status(500).json({ message: 'Failed to create product', error });
		})
}

const listProduct = (req, res) => {
    db('products')
        .select("*")
        .then((data) => {
            res.status(200).json({ result: data});
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to Get list product', err });
        })
}

const deleteProduct = async (req, res) => {
    let { productID	 }= req.params
    try {
        const empExists = await db('products').where('productID	', productID).first();
        
        if (!empExists) {
            throw new Error('Product does not exists');
        } 

        db('products')
            .where('productID', productID)
            .del()
            .then(() => {
                res.status(200).json({ message: 'Products deleted successfully' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Failed to delete products', error });
            })

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const updateProduct = async (req, res) => {
    let { productID }= req.params
    const errors = validationResult(req)

	if(!errors.isEmpty()){
		return res.status(500).json({ errors: errors.array() })
	}

    const { name, description, price } = req.body

    try {
        const empExists = await db('products').where('productID', productID).first();
        
        if (!empExists) {
            throw new Error('Product does not exists');
        } 

        db('products')
            .where('productID', productID)
            .update({
                name: name,
                description: description,
                price: price
            })
            .then(() => {
                res.status(200).json({ message: 'Product updated successfully' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Failed to update product', error });
            })

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = { createProduct, listProduct, deleteProduct, updateProduct };