var bitcoin = require('bitcoinjs-lib');

function signTx (unsignedTx, wif) {
    var privateKey = bitcoin.ECKey.fromWIF(wif)
    var tx = bitcoin.Transaction.fromHex(unsignedTx)
    var insLength = tx.ins.length
    for (var i = 0; i < insLength; i++) {
        tx.sign(i, privateKey)
    }
    return tx.toHex()
}

var key = 'L5EZLk33faPReMogtcEyAnHC55wbBqn4XYruEaBEwrHwnJFuWxsU'
// e.g. var key = 'KzH9zdXm95Xv3z7oNxzM6HqSPUiQbuyKoFdQBTf3HKx1B6eYdbAn';
var txHex = '0100000001e273221a20f0706fd6e0c67aba12af8bca59c05c3e547639a703f5014e5a52b10100000000ffffffff0358020000000000001976a9142693726e4bf248514579dbfc8af2b397f6e7f53688ac0000000000000000086a06434302150005a8b83618000000001976a914237052b54935b212627870f136fd16e7531f5d3388ac00000000';
// e.g. txHex = '0100000001e0cd69ce93aded7a8d51063ed5f7bb5c9cdcc885a93fa629574dedb2cd5b48ad0100000000ffffffff020000000000000000086a06434301050110b8820100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000'

var signedTxHex = signTx(txHex, key);
console.log("signedTxHex: ["+signedTxHex+"]");

