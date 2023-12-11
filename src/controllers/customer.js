import { Router } from 'express'
import { customerSchema } from '../db/schema/dvdrental.js'
import { eq } from 'drizzle-orm'

import dbConn from '../db/pgConn.js'

const customerRouter = Router()

class customerController {
  static async getAll(req, res) {
    const resutls = await dbConn.select().from(customerSchema).execute()

    res.status(200).send(resutls)
  }

  static async getCustomer(req, res) {
    console.log('POST request on user by ID', req.params.id)
    // const results = await dbConn.select().from(customerSchema).where().execute()

    const userFound = await dbConn.query.customerSchema.findFirst({
      where: (customerSchema, { eq }) =>
        eq(customerSchema.customer_id, req.params.id),
    })

    if (userFound) return res.status(200).send(userFound)

    return res.send({ message: 'User not found' })
  }
}

customerRouter.get('/:id', customerController.getCustomer)
customerRouter.get('/', customerController.getAll)

export default customerRouter
