// import nacl from 'tweetnacl';
const bip39 = require('bip39');
const nacl = require('tweetnacl');
const web3 = require('@solana/web3.js');

async function abc () {
    // const mnemonic = bip39.generateMnemonic();
    // const seed = await bip39.mnemonicToSeed(mnemonic);
    // console.log('seed', seed)
    const hexPrivate = Buffer.from('c1f1ecfe3f671f3e5aaff8aec0d96ed0a294404210daea1ec29eaf97529855b0', 'hex');
    // const keyPair = nacl.sign.keyPair.fromSeed(seed.slice(0, 32));
    // const keyPair = nacl.sign.keyPair.fromSeed(seed.slice(0, 32));
    const keyPair = nacl.sign.keyPair.fromSeed(hexPrivate.slice(0,32));
    this.accountSecretKey = keyPair.secretKey;
    console.log('keyPair', keyPair.secretKey)
     let  account = new web3.Account(accountSecretKey);
    console.log('account', account.publicKey.toString())
    console.log('account', account.publicKey.toBase58())
    // console.log('account', keyPair.publicKey.toString())
    // console.log('account1', Crypto.util.bytesToHex(keyPair.secretKey))
    // console.log('account1', uint8arrayToStringMethod(keyPair.publicKey))
}
function uint8arrayToStringMethod(myUint8Arr) {
    return String.fromCharCode.apply(null, myUint8Arr);
}

abc()