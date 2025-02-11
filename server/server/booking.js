const nodemailer = require('nodemailer');

// Configure the email transporter using environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

/**
 * Handle booking requests
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const handleBooking = (req, res) => {
    const { name, email, phone, service, date, message } = req.body;

    // Email options
    const mailOptions = {
        from: process.env.EMAIL,
        to: 'info.estimates@mexuslegacy.com',
        subject: 'New Booking Request - Mexus Legacy',
        text: `You have received a new booking request from the website:\n\n
               Name: ${name}\n
               Email: ${email}\n
               Phone: ${phone}\n
               Service: ${service}\n
               Preferred Date: ${date}\n
               Additional Information: ${message}\n\n
               Please contact the customer to confirm the appointment.\n\n
               Best regards,\n
               Mexus Legacy`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('An error occurred while sending the email.');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Booking request submitted successfully.');
        }
    });
};

module.exports = { handleBooking };
