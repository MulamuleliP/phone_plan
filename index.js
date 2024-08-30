import express from 'express';
import cors from 'cors';  
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = process.env.PORT || 4011;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


async function initializeDatabase() {
    try {
        const db = await sqlite.open({
            filename: './data_plan.db',
            driver: sqlite3.Database
        });

        await db.migrate();
        console.log('Database initialized and migrations applied.');

        return db; 
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}


async function startServer() {
    const db = await initializeDatabase();

    if (!db) {
        console.error('Failed to initialize the database. Exiting...');
        process.exit(1);
    }

   
    app.get('/api/price_plans', async (req, res) => {
        try {
            const plans = await db.all('SELECT * FROM price_plan');
            res.json(plans);
        } catch (err) {
            console.error('Error fetching price plans:', err);
            res.status(500).json({ error: 'Failed to fetch price plans' });
        }
    });

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

startServer(); 
