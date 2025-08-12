import { Router } from 'express';
import pool from './conection_db.js';

const router = Router();

router.post('/', async (req, res) => {
  const { client_id, invoiced_number, platform_used, period, invoiced_amount } = req.body;
  if (!client_id || !invoiced_number || !platform_used || !period || !invoiced_amount) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const [result] = await pool.query(
    'INSERT INTO payments (client_id, invoiced_number, platform_used, period, invoiced_amount) VALUES (?, ?, ?, ?, ?)',
    [client_id, invoiced_number, platform_used, period, invoiced_amount]
  );
  res.json({ id: result.insertId, ...req.body });
});

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM payments');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM payments WHERE payment_id = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});


router.put('/:id', async (req, res) => {
  const { client_id, invoiced_number, platform_used, period, invoiced_amount } = req.body;
  const [result] = await pool.query(
    'UPDATE payments SET client_id = ?, invoiced_number = ?, platform_used = ?, period = ?, invoiced_amount = ? WHERE payment_id = ?',
    [client_id, invoiced_number, platform_used, period, invoiced_amount, req.params.id]
  );
  if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Updated successfully' });
});

router.delete('/:id', async (req, res) => {
  const [result] = await pool.query('DELETE FROM payments WHERE payment_id = ?', [req.params.id]);
  if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted successfully' });
});