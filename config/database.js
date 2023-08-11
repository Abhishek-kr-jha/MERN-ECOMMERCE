const mongoose = require("mongoose");

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log('Mongodb conneted successfully')
    }).catch((error)=>{
        console.log(error)
    })
}

module.exports = connectDatabase;