const bip39 = require('bip39');
const nacl = require('tweetnacl');
const web3 = require('@solana/web3.js');
const bs58 = require('bs58');

function toBase58 (data) {
    return bs58.encode((data));
}

function toDecodeBase58(data) {
    return bs58.decode((data));
}

async function generateSolonaFromPrivateETH (key) {
  
    const hexPrivate = Buffer.from(key, 'hex');
    const keyPair = nacl.sign.keyPair.fromSeed(hexPrivate.slice(0, 32));
    this.accountSecretKey = keyPair.secretKey;
    console.log('account', toBase58(keyPair.publicKey) )
    console.log('privateKey', toBase58(keyPair.secretKey) )
}
async function generateSolona() {
    // create from normal
      const mnemonic = bip39.generateMnemonic();
    const seed = await bip39.mnemonicToSeed(mnemonic);
    console.log('seed', seed)
    const keyPair = nacl.sign.keyPair.fromSeed(seed.slice(0, 32));
    this.accountSecretKey = keyPair.secretKey;
    // console.log('keyPair', keyPair.secretKey)
    //  let  account = new web3.Account(accountSecretKey);
    // console.log('account', account.publicKey.toString())
    // console.log('account1', toBase58(account.publicKey.toBuffer()))
    // console.log('privateKey1', toBase58(account.secretKey) )
    console.log('account', toBase58(keyPair.publicKey) )
    console.log('privateKey', toBase58(keyPair.secretKey) )
}

abc()