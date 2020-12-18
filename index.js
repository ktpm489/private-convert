var bitcoin = require("bitcoinjs-lib")
var keyPair = bitcoin.ECPair.makeRandom();
// console.log('keyPair address', keyPair.getAddress());
// var address = keyPair.getAddress();
// console.log('privateKey', keyPair.toWIF());
// var pkey = keyPair.toWIF();
// const keyPair = bitcoin.ECPair.fromWIF(
//     'KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn',
// );
// normal
const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
// sewgit
// const { address } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey });
// console.log('address',address)
console.log('address1',address)
