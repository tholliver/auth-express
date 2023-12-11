import 'dotenv/config'

const PORT = process.env.PORT || 3001
const PG_URI = process.env.PG_URI || 'some_uri'
const SECRET_KEY_TOKEN = 'super_secret'

export const config = { PORT, PG_URI, SECRET_KEY_TOKEN }
