

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// If your phone has a modern camera (unlike my iPhone 4S)
// you might wanna make this bigger.
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


console.log(`Grill server listening on ${port}`);