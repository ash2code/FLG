const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const app = express();

const logPath = path.join('/var/log', 'app.log');
const accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('combined')); 

app.get('/', (req, res) => {
    res.send('Hello, Ashok');
});

app.listen(3000, () => {
    console.log('Web app listening on port 3000');
});
