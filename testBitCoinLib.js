const bitcore = require('bitcore-lib')
var privateKey = new bitcore.PrivateKey('5KhXAPYaoPhvjh6guHF8gJUnxdPMVwBTwrMevxVb3HGEDoF7qL4', bitcore.Networks.livenet);
// var privateKey = new bitcore.PrivateKey('5KhXAPYaoPhvjh6guHF8gJUnxdPMVwBTwrMevxVb3HGEDoF7qL4');
var publicKey = privateKey.toPublicKey();
var exported = privateKey.toWIF();
console.log('exported', exported)
var address = publicKey.toAddress(bitcore.Networks.livenet);
console.log('addressInfo', address.toString())
// for (x in address) {
//    console.log('x',x)
//    console.log(address[x].toString('hex'))
// }

// console.log('address', address.type, address.network ,address)


// function getInfoBTCData  (privateKeyInput ) {
//    var privateKey = new bitcore.PrivateKey(privateKeyInput);
//    var publicKey = privateKey.toPublicKey();
//    var exported = privateKey.toWIF();
//    console.log('exported', exported)
//    var address = publicKey.toAddress(bitcore.Networks.livenet);
//    console.log('address', address)
//    if (key && address) {
//       return { key: exported, address: address }
//    } else {
//       return null
//    }
// }