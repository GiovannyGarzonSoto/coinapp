import mongoose from 'mongoose'

export const databaseConnection = async() => {
    try{
        await mongoose.connect(process.env.MONGO_LOCAL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database connected')
    }catch(err) {
        console.log(err)
    }
}