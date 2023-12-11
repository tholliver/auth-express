import dbConn from '../db/pgConn.js'
import { Router } from 'express'
import { storeSchema } from '../db/schema/dvdrental.js'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { config } from '../../config.js'

const storeRouter = Router()

class storeController {
  static async getStore(req, res, next) {
    // const storeId = req.params.id
    const storeFound = dbConn.query.storeSchema.findFirst({
      where: () => {
        eq(storeSchema.store_id, req.params.id)
      },
    })

    if (!storeFound) {
      return res.status(404).send({ message: 'store not found' })
    }
    return res.status(200).send(storeFound)
  }
  static async getStores(req, res, next) {
    let token = ''
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }
    const decodedToken = jwt.verify(token, `${config.SECRET_KEY_TOKEN}`)

    // console.log('secret', typeof decodedToken, decodedToken)

    if (!token || !decodedToken.id)
      return res.status(401).send({ message: 'No authorized' })

    const allStores = await dbConn.query.storeSchema.findMany()

    return res.status(200).send(allStores)
  }
}

storeRouter.get('/:id', storeController.getStore)
storeRouter.get('/', storeController.getStores)

export default storeRouter
