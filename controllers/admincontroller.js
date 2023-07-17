const {Admin}=require('../model/Admin');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


module.exports.signup = async (req, res) => {
    const {name,email,phone,password} = { ...req.body }
    try {
    const existingAdmin = await Admin.findOne({email:email})
    if (existingAdmin) {
    return res.status(400).json('Admin already found..')
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newAdmin = new Admin({ name,email,phone, password: hashPassword})
    await newAdmin.save();
    const token = jwt.sign({ email: newAdmin.email, id: newAdmin._id }, 'token', { expiresIn: '1h' })
    res.status(200).json({ Admin: newAdmin, token })
    } catch (err) {
    console.log(err.message)
    res.status(500).json('Something went worng...')
    }
}