const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const shopRoutes = require('./routes/shopRoute.js');

app.set('view engine', 'ejs');
app.set('views', 'views');


const url = 'mongodb+srv://siri:10086@cluster0.hf576pm.mongodb.net/products';
const { default: mongoose } = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));












