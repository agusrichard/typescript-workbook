import express, { Request, Response } from 'express'

import createMQConsumer from './consumer'

const app = express()
const PORT = 3000
const AMQP_URL = String(process.env.AMQP_URL)
const QUEUE_NAME = String(process.env.QUEUE_NAME)
const consumer = createMQConsumer(AMQP_URL, QUEUE_NAME)

consumer()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})