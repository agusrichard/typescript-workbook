import bodyParser from 'body-parser'
import express, { Express } from 'express'

// Configs 
import { Configs, DB } from './configs'

// Models 
import models, { UsersModel } from './models'

// Controllers 
import controllers, { UsersController } from './controllers'

// Routes 
import routers from './routers'


// Application Initialization
const app: Express = express()


// Models Initializations
const usersModel: UsersModel = models.initializeUsersModel(DB)

// Controllers Initializations
const usersController: UsersController = controllers.initializeUsersController(usersModel)


app.use('/users', routers.initializeUsersRouter(usersController))

app.listen(Configs.PORT, () => {
  console.log(`Server listening on port ${Configs.PORT}`)
})
