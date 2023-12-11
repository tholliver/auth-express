import dbConn from '../db/pgConn.js'
import { Router, request } from 'express'
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

  static getTokenFrom = (req) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      return authorization.substring(7)
    }
    return null
  }

  static async getStores(req, res, next) {
    try {
      const token = storeController.getTokenFrom(req)
      const decodedToken = jwt.verify(token, config.SECRET_KEY_TOKEN)

      if (!decodedToken.id)
        return res.status(401).json({ error: 'token missing or invalid' })

      const allStores = await dbConn.query.storeSchema.findMany()

      return res.status(200).send(allStores)
    } catch (error) {
      next(error)
    }
  }
}

storeRouter.get('/:id', storeController.getStore)
storeRouter.get('/', storeController.getStores)

export default storeRouter
