const {Host}=require('../model/Host')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports.signup = async (req, res) => {
    const {id,company_name,email,phone,password} = { ...req.body }
    try {
    const existingHost = await Host.findOne({company_name:company_name})
    if (existingHost) {
    return res.status(400).json('Company Already Registered..')
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newHost = new Host({ id,company_name,email,phone, password: hashPassword})
    await newHost.save();
    const token = jwt.sign({ email: newHost.email}, 'token', { expiresIn: '1h' })
    res.status(200).json({ Host: newHost, token })
    } catch (err) {
    console.log(err.message)
    res.status(500).json('Something went worng...')
    }
}

module.exports.activate = async (req, res) => {
    const { company_name } = {...req.body}
            
    try {
    const NewHost = await Host.find({company_name:company_name})
    if (!NewHost) {
    res.status(404).json('Company Not Found')
    }
    const updatedHost = await Host.findOneAndUpdate({company_name:company_name}, {isActive:true})
    await updatedHost.save()
    res.status(200).json('updated Successfully')
    
    } catch (e) {
    res.status(500).json(e)
    }
}

module.exports.getall=async(req,res)=>{
    try {
        const Hosts = await Host.find({})
        res.status(200).json(Hosts)
        } catch (error) {
        res.status(500).json(error)
        }
}