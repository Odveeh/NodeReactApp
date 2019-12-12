const express = require('express');
const bodyparser = require('body-parser');
const routes = require('./Routes/routes.js');
const cors = require('cors')
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());
app.use('/', routes);
app.listen(3000);
