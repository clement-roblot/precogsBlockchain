// transfer.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var issuance_address = 'mikLW7UQscV5pg5pGeUukY91HY86bdeQEM';
var to_address = 'mj2vc96ehMGAa32hwWqt4KCRZLy7ugAoSG';


var send_asset = {
    'from': [issuance_address],		
    'fee': 5000,
    'to': [{
    	'address': to_address,
    	'amount': 5,
    	'assetId': 'La6VpQzR9QYooEdecWxFR2xavd4Vyec3rZWULC'
    }]
};

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

postToApi('sendasset', send_asset, function(err, body){
    if (err) {
        console.log('error: ', err);
    }
});
