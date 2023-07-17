const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const {connectdb} = require('./connect');
const userRoutes = require('./routes/userroute')
const adminRoutes= require('./routes/adminroute')
const stationRoutes=require('./routes/stationroute')
app=express()

dotenv.config();
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/',(req,res)=>{
    res.send("FreelancingForum")
    })
    
app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/station', stationRoutes)
connectdb()
.then(() => {
    console.log('Db connected')})
.catch(err => {
    console.log(err.message, 'oops err');
    });

const port = process.env.port || 8088
app.listen(port, () => {
console.log(`Server is running at port ${port}`)
});