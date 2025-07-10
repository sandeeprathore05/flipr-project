const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mainRoutes = require('./routes/mainRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/', mainRoutes);
app.use('/', adminRoutes);
app.use('/uploads', express.static('uploads'));


app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
