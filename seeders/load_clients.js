
import fs from 'fs'; 
import path from 'path'; 
import csv from 'csv-parser';
import { pool } from "../server/conection_db.js"


export async function loadClients() {

    const route = path.resolve('server/data/clients.csv');
    const clients = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(route)
            .pipe(csv())
            .on("data", (fila) => {
                usuarios.push([
                    fila.client_id,
                    fila.full_name.trim(),
                    fila.identification,
                    fila.address,
                    fila.phone,
                    fila.mail
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO clients (client_id,full_name,identification,address,phone,mail) VALUES ?';
                    const [result] = await pool.query(sql, [clients]);

                    console.log(`✅ Were inserted ${result.affectedRows} clients.`);
                    resolve(); 
                } catch (error) {
                    console.error('❌ Error inserting clients:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error reading CSV file from clients:', err.message);
                reject(err);
            });
    });
}