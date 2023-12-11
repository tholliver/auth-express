import express, { json } from 'express'
import { config } from './config.js'
import { corsMiddleware } from './src/cors.js'
import storeRouter from './src/controllers/stores.js'
import customerRouter from './src/controllers/customer.js'
import staffRouter from './src/controllers/staff.js'
import {
  errorHandler,
  requestLogger,
  ErrorHandler,
} from './src/middleware/index.js'
import 'express-async-errors'

const app = express()
app.use(json())

app.use(corsMiddleware())

app.get('/', (req, res) => {
  console.log()
  res.send({ message: 'welcome to my api' })
})
app.use(requestLogger)

app.use('/stores', storeRouter)
app.use('/customers', customerRouter)
app.use('/staff', staffRouter)

app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log(`App running on http://localhost:${config.PORT}`)
})
