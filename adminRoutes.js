const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db');
const router = express.Router();

// ⬇ Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// ✅ Admin Dashboard
router.get('/admin', (req, res) => {
  res.render('admin');
});

// ✅ Add Project (image upload)
router.post('/admin/project', upload.single('image'), (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  const query = 'INSERT INTO projects (name, description, image) VALUES (?, ?, ?)';
  db.query(query, [name, description, image], (err) => {
    if (err) throw err;
    res.redirect('/admin');
  });
});

// ✅ Add Client (image upload)
router.post('/admin/client', upload.single('image'), (req, res) => {
  const { name, description, designation } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  const query = 'INSERT INTO clients (name, description, designation, image) VALUES (?, ?, ?, ?)';
  db.query(query, [name, description, designation, image], (err) => {
    if (err) throw err;
    res.redirect('/admin');
  });
});

module.exports = router;
