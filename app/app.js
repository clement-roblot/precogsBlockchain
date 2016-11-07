
var bitcoin = buildLib.bitcoin;
var privateKey = ""
var publicKey = ""

function initApp(){

    /*var key = bitcoin.ECKey.makeRandom();
    publicKey = key.pub.getAddress(bitcoin.networks.testnet).toString();
    privateKey = key.toWIF();*/

    publicKey = "mikLW7UQscV5pg5pGeUukY91HY86bdeQEM";
    privateKey = "L5EZLk33faPReMogtcEyAnHC55wbBqn4XYruEaBEwrHwnJFuWxsU";
}


function getPublicKey(){

    return publicKey;
}


function getPrivateKey(){

    return privateKey;
}