import express from "express"
import { pool } from "../server/conection_db.js"

const app = express()
app.use(express.json()) 


app.get('/payments', async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT 
            p.plataform_used,
            p.invoiced_number,
            p.period,
            p.invoiced_amount,
            u.amount_paid,            
        FROM payments p
        LEFT JOIN clients c ON p.client_id = u.client_id
        LEFT JOIN transactions t ON p.id_transaction = t.id_transaction
        `);

        res.json(rows);

    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});



