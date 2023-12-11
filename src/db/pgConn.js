import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { config } from '../../config.js'
import * as schema from './schema/dvdrental.js'

// for query purposes
const queryClient = postgres(config.PG_URI)
const dbConn = drizzle(queryClient, { schema })

export default dbConn
