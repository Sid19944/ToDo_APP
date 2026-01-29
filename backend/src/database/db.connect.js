import mongoose from "mongoose"

export const dbconnect = async ()=>{
    try {
        mongoose.connect(`${process.env.DB_URL}`)
    } catch (error) {
        console.log("Error while connecting with db, ",error)
    }
}