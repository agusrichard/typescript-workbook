import morgan from 'morgan'
import bodyParser from 'body-parser'
import express, { Express, Router } from 'express'

import routers from './routers'
import models, { UsersModel, IncomeExpenseTypeModel } from './models'
import { Configs, initializeDatabase } from './configs'
import middlewares, { AuthMiddleware } from './middlewares'
import controllers, { UsersController, IncomeExpenseTypeController } from './controllers'

// Application Initialization
const app: Express = express()

// Initialize Databse
const db = initializeDatabase(Configs)

// Middlewares Initializations
const authMiddleware: AuthMiddleware = middlewares.initializeAuthMiddleware()

// Models Initializations
const usersModel: UsersModel = models.initializeUsersModel(db)
const incomeExpenseTypeModel: IncomeExpenseTypeModel = models.initilizeIncomeExpenseTypeModel(db)

// Controllers Initializations
const usersController: UsersController = controllers.initializeUsersController(usersModel)
const incomeExpenseTypeController: IncomeExpenseTypeController = controllers.initializeIncomeExpenseTypeController(incomeExpenseTypeModel)

// Routers Initializations
const usersRouters: Router = routers.initializeUsersRouter(usersController, authMiddleware)
const incomeExpenseRouters: Router = routers.initializeIncomeExpenseTypeRouter(incomeExpenseTypeController, authMiddleware)

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use('/users', usersRouters)
app.use('/income-expense-type', incomeExpenseRouters)

app.listen(Configs.PORT, () => {
  console.log(`Server listening on port ${Configs.PORT}`)
})
