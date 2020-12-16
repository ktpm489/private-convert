// import bip39 from 'bip39';
// import bs58 from 'bs58';
// import bitcoinjs from 'bitcoinjs-lib';
// import hdkey from 'ethereumjs-wallet/hdkey';
// import ethereumjsWallet from 'ethereumjs-wallet';

// import japaneseWordlist from 'bip39/wordlists/japanese.json';
// import englishWordlist from 'bip39/wordlists/english.json';



const bip39 = require('bip39');
const bs58 = require('bs58')
const bitcoinjs = require('bitcoinjs-lib')
const hdkey =  require('ethereumjs-wallet/hdkey')
const ethereumjsWallet = require('ethereumjs-wallet')

const japaneseWordlist = require('bip39/wordlists/japanese.json')
const englishWordlist = require('bip39/wordlists/english.json')


const bip32pathPrefix = "m/0'/0/";
const bip44pathPrefix = "m/44'/0'/0'/0/";
const myceliumAndroidPathPrefix = "m/44'/0'/0'/";

const derivationTries = 100;


const bitcore = require('bitcore-lib')

function getWordlistBySecret(secret) {
    let firstWord = secret.trim().split(/\u3000/g)[0] // use ideographic space in unicode

    // check if it is a japanese secret
    if (japaneseWordlist.indexOf(firstWord) !== -1) {
        console.log('detected japanese language.')
        return japaneseWordlist
    }

    return englishWordlist
}


function getETHData(wif= '') {
    let keyPair;
    try {
        keyPair = bitcoinjs.ECPair.fromWIF(wif);

        if (keyPair.getAddress() !== '') {
            // strip network byte and checksum bytes in the end
            let wallet = ethereumjsWallet.fromPrivateKey(bs58.decode(keyPair.toWIF()).slice(1, 33));
            console.log('wallet', wallet)
            return wallet
        }
    } catch (err) {
        this.error = 'This is not a valid secret.';
        console.warn(err);
        return null
    }
}

function getInfoData(address, secret ) {
        let wif;
        let hdRoot;
        let wordlist = getWordlistBySecret(secret)
        // check if we deal with a mnenomic phrase
        if (bip39.validateMnemonic(secret, wordlist) && bitcoinjs.address) {
            hdRoot = bitcoinjs.HDNode.fromSeedBuffer(bip39.mnemonicToSeed(secret));

            // search for used address
            for (var i = 0; i < derivationTries; i++) {

                // check if its a bip32 key
                if (hdRoot.derivePath(bip32pathPrefix + i).getAddress() === address) {
                    wif = hdRoot.derivePath(bip32pathPrefix + i).keyPair.toWIF();
                    break;
                }

                // check if its a bip44 key
                if (hdRoot.derivePath(bip44pathPrefix + i).getAddress() === address) {
                    wif = hdRoot.derivePath(bip44pathPrefix + i).keyPair.toWIF();
                    break;
                }

                // check if its a bip44 key used on mycelium for android
                if (hdRoot.derivePath(myceliumAndroidPathPrefix + i).getAddress() === address) {
                    wif = hdRoot.derivePath(myceliumAndroidPathPrefix + i).keyPair.toWIF();
                    break;
                }

                if (i + 1 >= derivationTries) {
                    console.log('We couldn\'t match your address to your key.');
                }

            }

        } else {
            wif = secret;
        }
        console.log('wif',wif)
        return wif
}




function getWalletInfo(addressBtc, wifBTC) {
    let wif = getInfoData(addressBtc, wifBTC)

    let wallet = getETHData(wif)
    if (wallet) {
        console.log('privateKey', wallet.getPrivateKey().toString('hex'))
        console.log('address',  wallet.getAddress().toString('hex'))
    }
}
// old 

// new 
function getInfoBTCData(privateKeyInput) {
    var privateKey = new bitcore.PrivateKey(privateKeyInput);
    var publicKey = privateKey.toPublicKey();
    var exported = privateKey.toWIF();
    if (bitcore.PrivateKey.isValid(privateKeyInput)) {
        var addressData = publicKey.toAddress(bitcore.Networks.livenet);
        if (exported && addressData) {
            return { key: exported, address: addressData }
        } else {
            return null
        }
    } else {
       return null
    }
   
}

function getWalletInfoNew(privateKeyInput) {
    let data = getInfoBTCData(privateKeyInput)
    console.log('data',data)
    if (data !== null) {
        let wallet = getETHData(data.key)
        if (wallet) {
            console.log('privateKey1', wallet.getPrivateKey().toString('hex'))
            console.log('address1', wallet.getAddress().toString('hex'))
        }
    }
}


// *** TEST ***/ 
// FORMAT NEW BTC 
// // https://www.bitaddress.org/bitaddress.org-v3.3.0-SHA256-dec17c07685e1870960903d8f58090475b25af946fe95a734f88408cef4aa194.html
// getWalletInfo('14omEwmr5yd9hceZPv6HKQv8sEEG7WQUng', 'L5Xr8SWQBmDeBRz77khNtU9frXbfUi9Bw6rAR9wBF4nDM4w3rvJL')
// getWalletInfoNew('L5Xr8SWQBmDeBRz77khNtU9frXbfUi9Bw6rAR9wBF4nDM4w3rvJL')

// FORMAT OLD BTC
// https://asecuritysite.com/encryption/bit_keys
// test https://free-online-app.com/bitcoin-ethereum-private-key-converter/
// getWalletInfo('1PQmtd6tQmAc3oFksdeTtxzhroEEjE313y', '5KhXAPYaoPhvjh6guHF8gJUnxdPMVwBTwrMevxVb3HGEDoF7qL4')
getWalletInfoNew('5KhXAPYaoPhvjh6guHF8gJUnxdPMVwBTwrMevxVb3HGEDoF7qL4')
