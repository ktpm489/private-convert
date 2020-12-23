var bitcoin = require("bitcoinjs-lib")
const bs58 = require('bs58')
const Crypto = require('cryptojs').Crypto
const BigInteger = require('bigi')
const TESTNET = bitcoin.networks.testnet;
// var keyPair = bitcoin.ECPair.makeRandom();
// console.log('keyPair address', keyPair.getAddress());
// var address = keyPair.getAddress();
// console.log('privateKey', keyPair.toWIF());
// var pkey = keyPair.toWIF();
// const keyPair = bitcoin.ECPair.fromWIF(
//     'L4sy9VnZFCjouYt175K7jBj3P5chRifw3JzoMXDgieMLWP23iWxM',
// );
// normal
// const bytes = bs58.decode('5KhXAPYaoPhvjh6guHF8gJUnxdPMVwBTwrMevxVb3HGEDoF7qL4').subarray(0, 32)
// console.log('bytes', bytes.length)
// const bytes = Buffer.from('f8078e94e471a5db754725de92213e9991c3105f8c9c71a57ed7c53c38e9af2b').subarray(0,32)
// var keyPair = bitcoin.ECPair.fromPrivateKey('5KhXAPYaoPhvjh6guHF8gJUnxdPMVwBTwrMevxVb3HGEDoF7qL4')
// var keyPair = bitcoin.ECPair.fromPrivateKey(bytes)
// console.log('privateKey', keyPair.toWIF());
// const data1 = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: TESTNET });
// console.log('data1', data1.address)
// sewgit
// const { address } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey });
// console.log('address',address)


// 9B866C692D6DCBD9953321518AE33DC0FE29C8F135F735FA5B98C06FA85D8D93
const bip39 = require('bip39')
// const mnemonic = bip39.entropyToMnemonic('9B866C692D6DCBD9953321518AE33DC0FE29C8F135F735FA5B98C06FA85D8D93')
const mnemonic = bip39.entropyToMnemonic('f8078e94e471a5db754725de92213e9991c3105f8c9c71a57ed7c53c38e9af2b')
console.log('mnemonic', mnemonic)
let data = bip39.mnemonicToSeed(mnemonic).subarray(0, 32)
console.log('data', data)
var keyPair = bitcoin.ECPair.fromPrivateKey(data)
console.log('privateKey', keyPair.toWIF());
const data1 = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
console.log('data1', data1.address)
const { address } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey });
console.log('address',address)