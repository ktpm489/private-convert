const bip39 = require('bip39');
const bs58 = require('bs58')
const bitcoinjs = require('bitcoinjs-lib')
const hdkey = require('ethereumjs-wallet/hdkey')
const ethereumjsWallet = require('ethereumjs-wallet')
const bitcore = require('bitcore-lib')
function getETHData(wif = '') {
    let keyPair;
    try {
        keyPair = bitcoinjs.ECPair.fromWIF(wif);

        if (keyPair.getAddress() !== '') {
            // strip network byte and checksum bytes in the end
            let wallet = ethereumjsWallet.fromPrivateKey(bs58.decode(keyPair.toWIF()).slice(1, 33));
            // console.log('wallet', wallet)
            return wallet
        }
    } catch (err) {
        this.error = 'This is not a valid secret.';
        console.warn(err);
        return null
    }
}

function getInfoBTCData(privateKeyInput) {
    var privateKey = new bitcore.PrivateKey(privateKeyInput);
    var publicKey = privateKey.toPublicKey();
    var exported = privateKey.toWIF();
    if (bitcore.PrivateKey.isValid(privateKeyInput)) {
        var addressData = publicKey.toAddress(bitcore.Networks.livenet);
        if (exported && addressData) {
            return { key: exported, address: addressData.toString() }
        } else {
            return null
        }
    } else {
        return null
    }

}
function getWalletInfoNew(privateKeyInput) {
    let data = getInfoBTCData(privateKeyInput)
    console.log('data', data)
    if (data !== null) {
        let wallet = getETHData(data.key)
        if (wallet) {
            console.log('privateKey', wallet.getPrivateKey().toString('hex'))
            console.log('address', wallet.getAddress().toString('hex'))
        }
    }
}

// *** TEST ***/ 
// FORMAT NEW BTC 
// // https://www.bitaddress.org/bitaddress.org-v3.3.0-SHA256-dec17c07685e1870960903d8f58090475b25af946fe95a734f88408cef4aa194.html
getWalletInfoNew('L5Xr8SWQBmDeBRz77khNtU9frXbfUi9Bw6rAR9wBF4nDM4w3rvJL')

// FORMAT OLD BTC
// https://asecuritysite.com/encryption/bit_keys
// test https://free-online-app.com/bitcoin-ethereum-private-key-converter/
getWalletInfoNew('5KhXAPYaoPhvjh6guHF8gJUnxdPMVwBTwrMevxVb3HGEDoF7qL4')
