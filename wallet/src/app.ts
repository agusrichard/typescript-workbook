import bodyParser from 'body-parser'
import express, { Express, Router } from 'express'

import routers from './routers'
import models, { UsersModel } from './models'
import { Configs, initializeDatabase } from './configs'
import controllers, { UsersController } from './controllers'
import middlewares, { AuthMiddleware } from './middlewares'

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

app.use('/users', usersRouters)

app.listen(Configs.PORT, () => {
  console.log(`Server listening on port ${Configs.PORT}`)
})
