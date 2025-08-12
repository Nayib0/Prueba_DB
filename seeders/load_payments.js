import fs from 'fs'; 
import path from 'path'; 
import csv from 'csv-parser';
import { pool } from "../server/conection_db.js"


export async function loadPayments() {

    const route = path.resolve('server/data/payments.csv');
    const payments = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(route)
            .pipe(csv())
            .on("data", (fila) => {
                payments.push([
                    fila.plataform_used,
                    fila.invoiced_number,
                    fila.period,
                    fila.invoiced_amount,
                    fila.amount_paid,                    
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO payments (plataform_used,invoiced_number,period,invoiced_amount,amount_paid) VALUES ?';
                    const [result] = await pool.query(sql, [payments]);

                    console.log(`✅ Were inserted ${result.affectedRows} payments.`);
                    resolve(); 
                } catch (error) {
                    console.error('❌ Error inserting payments:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error reading CSV file from payments:', err.message);
                reject(err);
            });
    });
}