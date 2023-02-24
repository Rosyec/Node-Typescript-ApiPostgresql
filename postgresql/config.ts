import { Pool } from 'pg';

export const pool: Pool = new Pool({
    user: 'checho',
    host: 'localhost',
    database: 'api',
    password: 'checho',
    port: 5432
});