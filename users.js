const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// 1. Get All Users (READ)
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 2. Add New User (CREATE)
app.post('/users', (req, res) => {
    const { key_id, userName, source, paymentType, deviceType, started_date, planType } = req.body;
    const sql = 'INSERT INTO users (key_id, userName, source, paymentType, deviceType, started_date, planType) VALUES (?, ?,  ?, ?, ?, ?, ?)';
    db.query(sql, [key_id, userName, source, paymentType, deviceType, started_date, planType], (err, result) => {
        console.log(err);
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, ...req.body });
    });
});

// 3. Update User (UPDATE)
app.put('/users/:id', (req, res) => {
    const { key_id, userName, source, paymentType, started_date, deviceType, planType } = req.body;
    const sql = 'UPDATE users SET key_id=?, userName=?, source=?, paymentType=?, deviceType=?, started_date=?, updated_at=?, planType=? WHERE id=?';
    db.query(sql, [key_id, userName, source, paymentType, deviceType, started_date, new Date(), planType, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'User updated' });
    });
});

// 4. Delete User (DELETE)
app.delete('/users/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id=?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'User deleted' });
    });
});

app.listen(5001, () => {
    console.log('Server running on port 5001');
});