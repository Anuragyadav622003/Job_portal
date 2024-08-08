import mongoose from 'mongoose'

export const db = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"Job_Seeking_Website"
    }).then(()=>{
        console.log("database is connected successfully")
    }).catch((error)=>{
       console.log(`database not connected error occur:${error}`)
    })
}