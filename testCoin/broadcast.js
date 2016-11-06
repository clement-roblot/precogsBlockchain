// broadcast.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');

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

var signedTxHex= '0100000001e273221a20f0706fd6e0c67aba12af8bca59c05c3e547639a703f5014e5a52b1010000006a47304402207e8cf08e3302ba4aa8634d7ca87eaa1c7096a810d6313460da6b297586223cdf0220140c6a4a28763eeba8ba95d9df0d4bdee7a0b7fafdd88d61d0e951f33c31b7fc012103aa579ca0d2d019b2933c121b791b6e6511fc2bb8993c927160bbaaeee62c0daaffffffff0358020000000000001976a9142693726e4bf248514579dbfc8af2b397f6e7f53688ac0000000000000000086a06434302150005a8b83618000000001976a914237052b54935b212627870f136fd16e7531f5d3388ac00000000'
;

var transaction = {
    'txHex': signedTxHex
}

postToApi('broadcast', transaction, function(err, body){
    if (err) {
        console.log('error: ', err);
    }
});
