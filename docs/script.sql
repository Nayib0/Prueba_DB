-- Base de datos 
DROP DATABASE IF EXISTS nayib_obeso_tayrona;
CREATE DATABASE nayib_obeso_tayrona;
USE nayib_obeso_tayrona;


-- Tabla: clients
CREATE TABLE clients (
    client_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(155) NOT NULL,
    identification VARCHAR(30) NOT NULL UNIQUE,
    address VARCHAR(255),
    phone VARCHAR(50),
    mail VARCHAR(255)
);

-- Tabla: transactions
CREATE TABLE transactions (
    id_transaction INT PRIMARY KEY,
    date_transaction date,
    amount_transaction DECIMAL(10,2),
    transaction_status VARCHAR(50),
    transaction_type VARCHAR(255)
);

-- Tabla: payments
CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    plataform_used VARCHAR(50),
    period VARCHAR(100),
    invoiced_amount VARCHAR(155),
    amount_paid VARCHAR(155),
    client_id INT,
    id_transaction INT,
    invoice_number VARCHAR(100),
    FOREIGN KEY (client_id) REFERENCES clients(client_id) on delete set null on update cascade,
    FOREIGN KEY (id_transaction) REFERENCES transactions(id_transaction) on delete set null on update cascade
);



select * from clients;
select * from transactions;
select * from payments;





