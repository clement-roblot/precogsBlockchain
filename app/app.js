
var bitcoin = buildLib.bitcoin;
var privateKey = ""
var publicKey = ""

var precogsTransactions;
var blockChainTransactions;
var blockChainAutentification;

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

    $.getJSON( "data/blockChainTransactions.json", function( data ) {

        blockChainTransactions = data.transactions;

        //alert( "kikoo " + JSON.stringify(blockChainTransactions) ) ;
    });

    $.getJSON( "data/blockChainAutentification.json", function( data ) {

        blockChainAutentification = data.companies;

        //alert( "kikoo " + JSON.stringify(blockChainAutentification) ) ;
    });
}


function getPublicKey(){

    return publicKey;
}


function getPrivateKey(){

    return privateKey;
}

function getPrecogsTransactionById(transactionId){

    // TODO : Yes it is an howfull way of searching, but it works

    for(var i = 0 ; i< precogsTransactions.length; i++){

        //console.log("searching in : " + precogsTransactions[i].id );

        if( precogsTransactions[i].id === transactionId ){

            return precogsTransactions[i];
        }
    }

    return null;
}


function getblockChainTransactionById(transactionId){

    // TODO : Yes it is an howfull way of searching, but it works

    for(var i = 0 ; i< blockChainTransactions.length; i++){

        //console.log("searching in : " + blockChainTransactions[i].id );

        if( blockChainTransactions[i].id === transactionId ){

            return blockChainTransactions[i];
        }
    }

    return null;
}

function getCompanieByAddress(address){

    // TODO : Yes it is an howfull way of searching, but it works

    for(var i = 0 ; i< blockChainAutentification.length; i++){

        //console.log("searching in : " + blockChainAutentification[i].id );

        if( blockChainAutentification[i].bcAddress === address ){

            //alert("found " + blockChainAutentification);
            return blockChainAutentification[i];
        }
    }

    return null;
}



function pathToHere(bctransaction){

    var path = "";
    var loopTransactions = true;

    var currentTransaction = bctransaction;

    var lastCompanie = getCompanieByAddress(currentTransaction.to)
    if (lastCompanie.icon != "" )
        path += "<img class=\"companieIcon\" src=\""+lastCompanie.icon+"\"></img>";
    else
        path += lastCompanie.name;

    while(loopTransactions == true)
    {
        var companieFrom = getCompanieByAddress(currentTransaction.from);

        var newElement = "";
        if (companieFrom.icon != "" )
            newElement = "<img class=\"companieIcon\" src=\""+companieFrom.icon+"\" alt=\""+companieFrom.name+"\"></img>";
        else
            newElement = companieFrom.name;

        //newElement += "<div class=\"container\">"
        newElement += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"glyphicon glyphicon-arrow-right\" data-toggle=\"tooltip\" title=\"Verified the "+currentTransaction.date+"\"></span> ";
        newElement += " <span class=\"badge badge-verified\"><span class=\"glyphicon glyphicon-ok\"></span></span> ";
        //newElement += "</div>"

        



        path = newElement + path;

        if( currentTransaction.previusTx != "" )
        {
            loopTransactions = true;
            currentTransaction = getblockChainTransactionById(currentTransaction.previusTx);
            //alert("loop");
        }
        else
        {
            loopTransactions = false;
        }
    }

    return path;
}

function getAsset(data) {
	var str = "";
	$.each( data, function( key, value ) {
		if( key != 'name' ) {
			str+=  '<p><strong>' + key.toUpperCase() + '</strong>'+'</p>' ;
			str +=tree(value);
		}
	});
	return str;
}

function tree(data) {    
	var str = '';
	if ( Object.prototype.toString.call(data) === '[object Array]' ) { 
		str = '<ul>';
		for (var i in data) {            
			str += '<li>'+data[i]+'</li>';         
		}   
		str += '</ul>';		
		return str;
	} else {
		$.each( data, function( key1, value1 ) {
			str += '<p><strong>'+key1+'</strong></p>';
			str += tree(value1);
		});
		return str;
	}
}