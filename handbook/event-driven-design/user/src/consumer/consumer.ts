import amqp, { Message } from 'amqplib/callback_api'

import { ConfigType } from '../configs'
import { IUserService } from '../services'

const createMQConsumer = (config: ConfigType, userService: IUserService) => {
  console.log('Connecting to RabbitMQ...')
  return () => {
    amqp.connect(config.AMQP_URL, (errConn, conn) => {
      if (errConn) {
        throw errConn
      }

      conn.createChannel((errChan, chan) => {
        if (errChan) {
          throw errChan
        }

        console.log('Connected to RabbitMQ')
        chan.assertQueue(config.AUTH_TO_USER_QUEUE, { durable: true })
        chan.consume(config.AUTH_TO_USER_QUEUE, (msg: Message | null) => {
          if (msg) {
            const parsed = JSON.parse(msg.content.toString())
            switch (parsed.action) {
              case 'CREATE':
                userService.createFromAuth(parsed.data)
                break
              default:
                break
            }
          }
        }, { noAck: true })
      })
    })
  }
}

export default createMQConsumer
