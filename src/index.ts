import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import compression from 'compression'
import mongoose from 'mongoose'
import authRoutes from './routes/authentication'
import userRoutes from './routes/users'
import cookieParser from 'cookie-parser'

dotenv.config()
const port  = process.env.PORT || 8080
if(process.env.MONGODB_URL) {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('mongodb connected'))
}else {
    console.log('Something went wrong with DB')
}


const app = express()
app.use(express.json())
app.use(cors({
    credentials: true
}))
app.use(compression())
app.use(cookieParser())

// middlewares for all routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});