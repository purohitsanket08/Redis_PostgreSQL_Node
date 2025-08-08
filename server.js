import express from 'express';
import { json } from 'express';
import pkg from 'pg';
import { config } from 'dotenv';
import RedisCache from './redisConn.js';
const { Pool } = pkg;
config();

const app = express();
app.use(json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});



app.get('/test', async (req, res) => {
    try {
        const cache = new RedisCache();
        //console.log("cache",cache);
        const redisStatus = await cache.checkRedis('menu_items');
        //console.log("redisStatus:", redisStatus);  // Fixed console log
        if (!redisStatus) {
            const result = await pool.query('SELECT * from sys.menu', []);
            res.json(result.rows);
            await cache.saveToRedis('menu_items', result.rows);
        } else {
            res.json(JSON.parse(redisStatus));
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
