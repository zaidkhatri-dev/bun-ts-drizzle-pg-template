import { Pool } from "pg"
import { env } from "@config/env"
import { MAX_POOL_SIZE, IDLE_TIMEOUT, CONNECTION_TIMEOUT } from "@constants/app"
import { drizzle } from 'drizzle-orm/node-postgres';

export const pool = new Pool({
    connectionString: env.DATABASE_URL,
    max: MAX_POOL_SIZE,
    idleTimeoutMillis: IDLE_TIMEOUT,
    connectionTimeoutMillis: CONNECTION_TIMEOUT,
    allowExitOnIdle: true,
    ssl: env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
    } : false
})

export const db = drizzle({client: pool})


