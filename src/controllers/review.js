const { validationResult } = require('express-validator');
const db = require('../config/database')
const today = new Date();

const createReview = (req, res) => {
	const errors = validationResult(req)
    
	if(!errors.isEmpty()){
		return res.status(500).json({ errors: errors.array() })
	}
    
	const { userID,productID,rating,comment } = req.body

	db('review')
		.insert({ userID,productID,rating,comment, createdAt:today })
        //ถ้าสำเร็จ
        .then(() => {
			res.status(200).json({ message: 'Review created successfully' });
		})
        //ถ้าไม่สำเร็จ
		.catch((error) => {
			res.status(500).json({ message: 'Failed to create review', error });
		})
}

const listReview = (req, res) => {
    db('review')
        .select("*")
        .then((data) => {
            res.status(200).json({ result: data});
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to Get list review', err });
        })
}

const deleteReview = async (req, res) => {
    let { reviewID }= req.params
    try {
        const empExists = await db('review').where('reviewID', reviewID).first();
        
        if (!empExists) {
            throw new Error('Review does not exists');
        } 

        db('review')
            .where('reviewID', reviewID)
            .del()
            .then(() => {
                res.status(200).json({ message: 'Review deleted successfully' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Failed to delete products', error });
            })

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const updateReview = async (req, res) => {
    let { reviewID }= req.params
    const errors = validationResult(req)

	if(!errors.isEmpty()){
		return res.status(500).json({ errors: errors.array() })
	}

    const { rating,comment } = req.body

    try {
        const empExists = await db('review').where('reviewID', reviewID).first();
        
        if (!empExists) {
            throw new Error('Product does not exists');
        } 

        db('review')
            .where('reviewID', reviewID)
            .update({
                rating: rating,
                comment: comment,
            })
            .then(() => {
                res.status(200).json({ message: 'Review updated successfully' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Failed to update Review', error });
            })

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = { createReview,listReview,deleteReview,updateReview };