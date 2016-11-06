// issue_funded.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');

funded_address = 'mikLW7UQscV5pg5pGeUukY91HY86bdeQEM'
// e.g. funded_address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';

function postToApi(api_endpoint, json_data, callback) {
    console.log(api_endpoint+': ', JSON.stringify(json_data));
    request.post({
        url: 'http://testnet.api.coloredcoins.org:80/v3/'+api_endpoint,
        headers: {'Content-Type': 'application/json'},
        form: json_data
    }, 
    function (error, response, body) {
        if (error) {
            return callback(error);
        }
        if (typeof body === 'string') {
            body = JSON.parse(body)
        }
        console.log('Status: ', response.statusCode);
        console.log('Body: ', JSON.stringify(body));
        return callback(null, body);
    });
};

var asset = {
    'issueAddress': funded_address,
    'amount': 1,
    'fee': 5000
};

postToApi('issue', asset, function(err, body){
    if (err) {
        console.log('error: ', err);
    }
});
