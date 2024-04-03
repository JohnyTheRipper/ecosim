// validator.js

const https = require('https');
const querystring = require('querystring');

function validateHtml() {
    const html = ''; // Insert your HTML code here

    const postData = querystring.stringify({
        fragment: html,
        output: 'json'
    });

    const options = {
        hostname: 'validator.w3.org',
        port: 443,
        path: '/nu/?out=json',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const result = JSON.parse(data);
            if (result.messages.length === 0) {
                console.log('HTML is valid');
            } else {
                console.error('HTML validation errors:');
                result.messages.forEach(message => {
                    console.error(`${message.type}: ${message.message} at line ${message.lastLine}, column ${message.lastColumn}`);
                });
            }
        });
    });

    req.on('error', (error) => {
        console.error('An error occurred while validating HTML:', error);
    });

    req.write(postData);
    req.end();
}

// Export the validateHtml function
module.exports = { validateHtml };
