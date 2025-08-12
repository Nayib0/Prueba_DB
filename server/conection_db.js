import mysql from "mysql2/promise"

export const pool = mysql.createPool({
    host: "localhost",
    database: nayib_obeso_tayrona,
    port: 3306,
    user: root,
    password:""
              
})



