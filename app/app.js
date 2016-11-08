
var bitcoin = buildLib.bitcoin;
var privateKey = ""
var publicKey = ""

var precogsTransactions;

function initApp(){

    /*var key = bitcoin.ECKey.makeRandom();
    publicKey = key.pub.getAddress(bitcoin.networks.testnet).toString();
    privateKey = key.toWIF();*/

    publicKey = "mikLW7UQscV5pg5pGeUukY91HY86bdeQEM";
    privateKey = "L5EZLk33faPReMogtcEyAnHC55wbBqn4XYruEaBEwrHwnJFuWxsU";


    $.getJSON( "data/precogsTransactions.json", function( data ) {

        precogsTransactions = data.transactions;

        //alert( "kikoo " + JSON.stringify(precogsTransactions) ) ;
    });
}


function getPublicKey(){

    return publicKey;
}


function getPrivateKey(){

    return privateKey;
}

function getPrecogsTransactionById(transactionId){

    for(var i = 0 ; i< precogsTransactions.length; i++){

        console.log("searching in : " + precogsTransactions[i].id );

        if( precogsTransactions[i].id === transactionId ){

            return precogsTransactions[i];
        }
    }

    return null;
}