const express = require('express');
const router = express.Router();
const db = require('../db');

// Landing page
router.get('/', (req, res) => {
  const projectQuery = 'SELECT * FROM projects';
  const clientQuery = 'SELECT * FROM clients';

  db.query(projectQuery, (err, projects) => {
    if (err) throw err;
    db.query(clientQuery, (err, clients) => {
      if (err) throw err;
      res.render('index', { projects, clients });
    });
  });
});

// Contact Form Submission
router.post('/contact', (req, res) => {
  const { fullName, email, phone, city } = req.body;
  const query = 'INSERT INTO contacts (full_name, email, phone, city) VALUES (?, ?, ?, ?)';
  db.query(query, [fullName, email, phone, city], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Newsletter Subscription
router.post('/subscribe', (req, res) => {
  const { email } = req.body;
  const query = 'INSERT INTO newsletters (email) VALUES (?)';
  db.query(query, [email], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;
