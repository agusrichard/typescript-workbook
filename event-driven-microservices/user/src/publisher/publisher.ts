import amqp, { Connection } from 'amqplib/callback_api'

import { ConfigType } from '../configs'

const createMQPublisher = (config: ConfigType) => {
  console.log('Connecting to RabbitMQ...')
  let ch: any
  const queue = config.USER_TO_AUTH_QUEUE
  amqp.connect(config.AMQP_URL, (errorConnect: Error, connection: Connection) => {
    if (errorConnect) {
      console.log('Error connecting to RabbitMQ: ', errorConnect)
      return
    }

    connection.createChannel((errorChannel, channel) => {
      if (errorChannel) {
        console.log('Error creating channel: ', errorChannel)
        return
      }

      ch = channel
      console.log('Connected to RabbitMQ')
    })
  })
  return (msg: string) => {
    console.log('Publishing message to RabbitMQ...')
    ch.sendToQueue(queue, Buffer.from(msg))
  }
}

export default createMQPublisher
