import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/User'

dotenv.config()
const port  = process.env.PORT || 8080

const app = express()
app.use(express.json())

app.use('/api/user', userRoutes)

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})