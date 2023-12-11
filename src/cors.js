import cors from 'cors'

const ACCEPTED_ORIGINS = ['http://localhost:5173']

export const corsMiddleware = ({ allowerOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors({
    origin: (origin, callback) => {
      if (allowerOrigins.includes(origin)) return callback(null, true)
      if (!origin) return callback(null, true)

      return callback(new Error('Not allowed by CORS'))
    },
  })
}
