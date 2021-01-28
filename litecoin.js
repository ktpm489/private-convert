const litecore = require('litecore-lib')

function generateLiteCoin (isLiveNet = true, chain = 'litecoin') {
    var privateKey = new litecore.PrivateKey();
    var address = privateKey.toAddress(isLiveNet ? litecore.Networks.livenet : litecore.Networks.testnet);
    // console.log('privateKey', privateKey.toString())
    // console.log('wifKey', privateKey.toWIF())
    // console.log('address', address.toString())
    return { address: address.toString(), privateKey: privateKey.toWIF(), chain: chain }
}
generateLiteCoin()


function importLiteCoin( keyInput, isLiveNet = true, chain = 'litecoin') {
    if (keyInput.length === 52) {
        console.log("EE")
        const imported = new litecore.PrivateKey.fromWIF(keyInput)
        console.log('imported', imported)
        const publicKey = imported.toPublicKey();
        const addressFromWIF = publicKey.toAddress(isLiveNet ? litecore.Networks.livenet : litecore.Networks.testnet);
        console.log('publicKey', publicKey)
        console.log('addressFromWIF', addressFromWIF)
        return { address: addressFromWIF, privateKey: keyInput, chain: chain }
    } else {
        var privateKey = new litecore.PrivateKey(keyInput);
        var address = privateKey.toAddress(isLiveNet ? litecore.Networks.livenet : litecore.Networks.testnet);
        console.log('privateKeyIMP', privateKey.toString())
        console.log('wifKeyIMP', privateKey.toWIF())
        console.log('addressIMP', address.toString())
        return { address: address.toString(), privateKey: privateKey.toWIF(), chain: chain }
    }

    // if (litecore.PrivateKey.isValid(keyInput)) {
    //     console.log('valid')
    // } else {
    //     // get the specific validation error that can occurred
    //     var error = litecore.PrivateKey.getValidationError(keyInput, litecore.Networks.livenet);
    //     if (error) {
    //         console.log('error11', error)
    //     }
    // }   

   
}
// importLiteCoin('5544d0f00044cdb0097180ee4157464f4f5c5ab7f670b6b61e0e078b50db89a3')
// importLiteCoin('L53fCHmQhbNp1B4JipfBtfeHZH7cAibzG9oK19XfiFzxHgAkz6JK')
// importLiteCoin('T5ujDDVBZQ629yHxg5SCHheFL8ancq6svSqmDb1P693pih8DpzB7')
importLiteCoin('5544d0f00044cdb0097180ee4157464f4f5c5ab7f670b6b61e0e078b50db89a3')