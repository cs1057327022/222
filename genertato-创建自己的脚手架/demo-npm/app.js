const express = require('express');
const app = express();
const { port, upload } = require('./config/config');
const Error = require('./middleware/error');
const formidable = require('express-formidable');
const path = require('path');
const cors = require('cors')
const checkToken = require('./middleware/checkToken')

const routes = require('./routes')


app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());

app.use(formidable(upload));
app.use(checkToken())

app.use('/',routes)
app.use(Error())

app.listen(port)