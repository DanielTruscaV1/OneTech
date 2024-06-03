// emailService.js
const emailjs = require('emailjs-com');

emailjs.init(process.env.VITE_EMAIL_PUBLIC_KEY); // Initialize with your user ID

function sendEmail(from, to) {
    const templateParams = {
        requester: from,
        user: to,
    };

    return emailjs.send(process.env.VITE_EMAIL_SERVICE_ID, process.env.VITE_EMAIL_TEMPLATE_ID, templateParams)
        .then(response => {
            console.log('Email sent successfully!', response.status, response.text);
            return response;
        })
        .catch(err => {
            console.error('Failed to send email:', err);
            throw err;
        });
}

module.exports = { sendEmail };
