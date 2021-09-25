import express, { Express } from 'express'
import routes from './routes'

const app: Express = express()
const port = 3000

app.use('/users', routes.userRouter)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
