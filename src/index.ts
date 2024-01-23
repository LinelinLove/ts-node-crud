import dotenv from 'dotenv'

import express from 'express'
import thingRouter from './routes/thingRouter'
dotenv.config()
const app = express()

app.use(express.json())

app.use('/things', thingRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://${process.env.DB_HOST}:${process.env.PORT}`)
})