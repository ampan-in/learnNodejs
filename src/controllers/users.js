const { validationResult } = require('express-validator');
const db = require('../config/database')

const createUsers = (req, res) => {
	const errors = validationResult(req)
    const today = new Date();

	if(!errors.isEmpty()){
		return res.status(500).json({ errors: errors.array() })
	}
    
	const { username, password, email } = req.body

	db('users')
		.insert({ username, password, email, createdAT:today })
        //ถ้าสำเร็จ
        .then(() => {
			res.status(200).json({ message: 'User created successfully' });
		})
        //ถ้าไม่สำเร็จ
		.catch((error) => {
			res.status(500).json({ message: 'Failed to create user', error });
		})
}

const listUsers = (req, res) => {
    db('users')
        .select("*")
        .then((data) => {
            res.status(200).json({ result: data});
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to Get list Users', err });
        })
}
const deleteUsers = async (req, res) => {
    let { userID }= req.params
    try {
        const empExists = await db('users').where('userID', userID).first();
        
        if (!empExists) {
            throw new Error('User does not exists');
        } 

        db('users')
            .where('userID', userID)
            .del()
            .then(() => {
                res.status(200).json({ message: 'User deleted successfully' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Failed to delete user', error });
            })

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const updateUsers = async (req, res) => {
    let { userID }= req.params
    const errors = validationResult(req)

	if(!errors.isEmpty()){
		return res.status(500).json({ errors: errors.array() })
	}

    const { name, description, price } = req.body

    try {
        const empExists = await db('users').where('userID', userID).first();
        
        if (!empExists) {
            throw new Error('User does not exists');
        } 

        db('users')
            .where('userID', userID)
            .update({
                name: name,
                description: description,
                price: price
            })
            .then(() => {
                res.status(200).json({ message: 'User updated successfully' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Failed to update user', error });
            })

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = { createUsers,listUsers,deleteUsers,updateUsers };