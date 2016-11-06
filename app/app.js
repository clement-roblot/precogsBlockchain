
var bitcoin = buildLib.bitcoin;
var privateKey = ""
var publicKey = ""

function initApp(){

    var key = bitcoin.ECKey.makeRandom();
    publicKey = key.pub.getAddress(bitcoin.networks.testnet).toString();
    privateKey = key.toWIF();
}


function getPublicKey(){

    return publicKey;
}




function getPrivateKey(){

    return privateKey;
}