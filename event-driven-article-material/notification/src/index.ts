import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'

import createMQConsumer from './consumer'

dotenv.config()

const PORT = parseInt(String(process.env.PORT), 10) || 3000
const AMQP_URL = String(process.env.AMQP_URL)
const QUEUE_NAME = String(process.env.QUEUE_NAME)

const app = express()
const consumer = createMQConsumer(AMQP_URL, QUEUE_NAME)

consumer()
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
