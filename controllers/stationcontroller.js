const {Station}=require('../model/Station');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports.insert = async (req, res) => {

    const {id,name,created_at,lat,lon} = { ...req.body }
    try {
    const existingStation = await Station.findOne({name:name})
    if (existingStation) {
    return res.status(400).json('Station already found..')
    }
    const newStation = new Station({id:Number(id),name,created_at,lat,lon})
    await newStation.save();
    const token = jwt.sign({ name: newStation.name, id: newStation._id }, 'token', { expiresIn: '1h' })
    res.status(200).json({ Station: newStation, token })
    } catch (err) {
    console.log(err.message)
    res.status(500).json('Something went worng...')
    }
}

module.exports.get_Station = async (req, res) => {
    try {
    const { name } = {...req.body};
    const StationNew = await Station.findOne({name:name})
    if(StationNew) res.status(200).json(StationNew)
    else res.send({msg:"not found !"})
    }
    catch (e) {
    console.log(e.message)
    res.status(500).json(e.message)
    }
    }
module.exports.getAllStations = async (req, res) => {
        try {
        const Stations = await Station.find({})
        res.status(200).json(Stations)
        } catch (error) {
        res.status(500).json(error)
        }
        }

module.exports.updateStation = async (req, res) => {
            const { name } = {...req.body}
            
            try {
            const NewStation = await Station.find({name:name})
            if (!NewStation) {
            res.status(404).json('Station Not Found')
            }
            const updatedStation = await Station.findOneAndUpdate({name:name}, { ...req.body })
            await updatedStation.save()
            res.status(200).json('updated Successfully')
            
            } catch (e) {
            res.status(500).json(e)
            }
}

module.exports.deleteStation = async (req, res) => {
    const { name } = {...req.body}

    try {
        const NewStation=await Station.findOne({name:name})
        if(!NewStation) res.send({msg:"not found !"})
        else {
            await NewStation.deleteOne({name:name})
            res.send({msg:"DELETED"})
        }
    } catch (e) {
    console.log(e.message)
    res.status(500).json(e)
    }
    
    }