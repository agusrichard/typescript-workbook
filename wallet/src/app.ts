import morgan from 'morgan'
import bodyParser from 'body-parser'
import express, { Express, Router } from 'express'

import routers from './routers'
import models, { UsersModel } from './models'
import { Configs, initializeDatabase } from './configs'
import middlewares, { AuthMiddleware } from './middlewares'
import controllers, { UsersController } from './controllers'

// Application Initialization
const app: Express = express()

// Initialize Databse
const db = initializeDatabase(Configs)

// Middlewares Initializations
const authMiddleware: AuthMiddleware = middlewares.initializeAuthMiddleware()

// Models Initializations
const usersModel: UsersModel = models.initializeUsersModel(db)

// Controllers Initializations
const usersController: UsersController = controllers.initializeUsersController(usersModel)

// Routers Initializations
const usersRouters: Router = routers.initializeUsersRouter(usersController, authMiddleware)

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use('/users', usersRouters)

app.listen(Configs.PORT, () => {
  console.log(`Server listening on port ${Configs.PORT}`)
})
