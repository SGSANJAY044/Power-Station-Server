const {User}=require('../model/User');
const {Admin}=require('../model/Admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports.signup = async (req, res) => {

    const {name,email,phone,password} = { ...req.body }
    try {
    const existinguser = await User.findOne({email:email})
    if (existinguser) {
    return res.status(400).json('User already found..')
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name,email,phone, password: hashPassword})
    await newUser.save();
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'token', { expiresIn: '1h' })
    res.status(200).json({ user: newUser, token })
    } catch (err) {
    console.log(err.message)
    res.status(500).json('Something went worng...')
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
    var existinguser = await User.findOne({ email:email })
    if (!existinguser) {
    existinguser= await Admin.findOne({ email:email })
    if (!existinguser) {
    console.log("User not found...");
    return res.status(404).json("User not found...")
    }
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password)
    if (!isPasswordCrt) {
    return res.status(400).json("Password Incorrect")
    }
    const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, 'token', { expiresIn: '48h' })
    res.status(200).json({ user: existinguser, token })
    } catch (err) {
    
    res.status(500).json(err.message)
    }
}

module.exports.get_user = async (req, res) => {
    try {
    const { email } = {...req.body};
    const user = await User.findOne({email:email})
    if(user) res.status(200).json(user)
    else res.send({msg:"not found !"})
    }
    catch (e) {
    console.log(e.message)
    res.status(500).json(e.message)
    }
    }
module.exports.getAllUsers = async (req, res) => {
        try {
        const users = await User.find({})
        res.status(200).json(users)
        } catch (error) {
        
        res.status(500).json(error)
        }
        }

module.exports.updateuser = async (req, res) => {
            const { email } = {...req.body}
            
            try {
            const user = await User.find({email:email})
            if (!user) {
            res.status(404).json('User Not Found')
            }
            const updateduser = await User.findOneAndUpdate({email:email}, { ...req.body })
            await updateduser.save()
            res.status(200).json('updated Successfully')
            
            } catch (e) {
            res.status(500).json(e)
            }
}

module.exports.deleteuser = async (req, res) => {
    const { email } = {...req.body}

    try {
        const user=await User.findOne({email:email})
        if(!user) res.send({msg:"not found !"})
        else {
            await User.deleteOne({email:email})
            res.send({msg:"DELETED"})
        }
    } catch (e) {
    console.log(e.message)
    res.status(500).json(e)
    }
    
    }