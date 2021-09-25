import bodyParser from 'body-parser'
import express, { Express } from 'express'

// Configs 
import { Configs, DB } from './configs'

// Models 
import models, { Users } from './models'

// Controllers 

// Routes 
import { UserRouter } from './routes'


// Application Initialization
const app: Express = express()


// Models Initializations
const usersModel: Users = models.usersInitializer(DB)

// Controllers Initializations


app.use('/users', UserRouter)

app.listen(Configs.PORT, () => {
  console.log(`Server listening on port ${Configs.PORT}`)
})
