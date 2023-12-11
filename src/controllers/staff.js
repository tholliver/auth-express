import dbConn from '../db/pgConn.js'
import { Router } from 'express'
// import { staffSchema } from '../db/schema/dvdrental.js'
// import { eq, and } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { config } from '../../config.js'

const staffRouter = Router()

class staffController {
  static async getStaffMember(req, res, next) {
    const { email, password } = req.body
    if (!email && !password) return res.send({ message: 'No info provided' })
    const user = await dbConn.query.staffSchema.findFirst({
      where: (staffSchema, { eq, and }) =>
        and(eq(staffSchema.email, email), eq(staffSchema.password, password)),
    })

    const passCorrect =
      user === undefined ? false : bcrypt.compare(password, user.password)

    if (!user && !passCorrect) {
      return res.status(401).json({ error: 'Invalid password or email' })
    }

    const token = jsonwebtoken.sign(
      { id: user.staff_id, email: user.email },
      `${config.SECRET_KEY_TOKEN}`
    )

    return res
      .status(200)
      .send({ username: user.usuario, email: user.email, token: token })
  }
}

staffRouter.post('/login', staffController.getStaffMember)

export default staffRouter
