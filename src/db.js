import pkg from 'pg';
const {Pool} = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const query = (text, params) => {
    return pool.query(text, params);
}

const initializeDatabase = async () => {
    try{
        await query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Database tables created or already exists.')
    } catch (error) {
        console.error(error);
    }
}

initializeDatabase();

export default pool;