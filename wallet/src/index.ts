import morgan from 'morgan'
import bodyParser from 'body-parser'
import express, { Express, Router } from 'express'

import routers from './routers'
import { Configs, initializeDatabase } from './configs'
import middlewares, { AuthMiddleware } from './middlewares'
import models, { UsersModel, IncomeExpenseTypeModel, IncomeExpenseModel } from './models'
import controllers, { UsersController, IncomeExpenseTypeController, IncomeExpenseController } from './controllers'

// Application Initialization
const app: Express = express()

// Initialize Databse
const db = initializeDatabase(Configs)

// Middlewares Initializations
const authMiddleware: AuthMiddleware = middlewares.initializeAuthMiddleware()

// Models Initializations
const usersModel: UsersModel = models.initializeUsersModel(db)
const incomeExpenseModel: IncomeExpenseModel = models.initializeIncomeExpenseModel(db)
const incomeExpenseTypeModel: IncomeExpenseTypeModel = models.initilizeIncomeExpenseTypeModel(db)

// Controllers Initializations
const usersController: UsersController = controllers.initializeUsersController(usersModel)
const incomeExpenseController: IncomeExpenseController = controllers.initializeIncomeExpenseContoller(incomeExpenseModel)
const incomeExpenseTypeController: IncomeExpenseTypeController = controllers.initializeIncomeExpenseTypeController(incomeExpenseTypeModel)

// Routers Initializations
const usersRouters: Router = routers.initializeUsersRouter(usersController, authMiddleware)
const incomeExpenseRouters: Router = routers.initializeIncomeExpenseRouter(incomeExpenseController, authMiddleware)
const incomeExpenseTypeRouters: Router = routers.initializeIncomeExpenseTypeRouter(incomeExpenseTypeController, authMiddleware)

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use('/users', usersRouters)
app.use('/income-expense', incomeExpenseRouters)
app.use('/income-expense-type', incomeExpenseTypeRouters)

app.get('/', (req, res) => {
  res.send('Welcome to the API')
})

app.listen(Configs.PORT, () => {
  console.log(`Server listening on port ${Configs.PORT}`)
})
