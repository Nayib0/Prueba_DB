
import fs from 'fs'; 
import path from 'path'; 
import csv from 'csv-parser';
import { pool } from "../server/conection_db.js"


export async function loadClients() {

    const route = path.resolve('server/data/transactions.csv');
    const transactions = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(route)
            .pipe(csv())
            .on("data", (fila) => {
                transactions.push([
                    fila.id_transaction,
                    fila.date_transaction,
                    fila.amount_transaction,
                    fila.transaction_status,
                    fila.transaction_type
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO transactions (id_transaction,date_transaction,amount_transaction,transaction_status,transaction_type) VALUES ?';
                    const [result] = await pool.query(sql, [transactions]);

                    console.log(`✅ Were inserted ${result.affectedRows} transactions.`);
                    resolve(); 
                } catch (error) {
                    console.error('❌ Error inserting transactions:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error reading CSV file from transactions:', err.message);
                reject(err);
            });
    });
}