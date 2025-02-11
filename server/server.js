const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const booking = require('./booking');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', booking.handleBooking);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
