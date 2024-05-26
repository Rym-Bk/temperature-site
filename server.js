const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Configuration de la connexion MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ton utilisateur MySQL, par défaut c'est 'root'
    password: '', // Ton mot de passe MySQL, par défaut c'est vide
    database: 'arduino' // Le nom de la base de données que tu utilises
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Route pour récupérer la température actuelle
app.get('/temperature', (req, res) => {
    let sql = 'SELECT temperature FROM tt ORDER BY id DESC LIMIT 1';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching temperature:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json({ temperature: result[0].temperature });
    });
});

// Route pour récupérer l'historique des températures
app.get('/history', (req, res) => {
    let sql = 'SELECT * FROM tt ORDER BY id DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching history:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
