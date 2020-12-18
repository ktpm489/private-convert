const cosmosjs = require("@cosmostation/cosmosjs");
const bip39 = require('bip39')
const bs58 = require('bs58');
const chainId = "cosmoshub-3";
// cosmos use mnemonic to restore
const cosmos = cosmosjs.network("https://lcd-cosmos-free.cosmostation.io", chainId);
// from private key ETH
const mnemonic = bip39.entropyToMnemonic('9B866C692D6DCBD9953321518AE33DC0FE29C8F135F735FA5B98C06FA85D8D93')
// const mnemonic = bip39.entropyToMnemonic('C1F1ECFE3F671F3E5AAFF8AEC0D96ED0A294404210DAEA1EC29EAF97529855B0')
// const mnemonic = bip39.entropyToMnemonic('2EA7CA487F9262EADE20730D18CDEE9910222B0CC7615ED3DA9AD91A630DDCE9')
// const mnemonic = 'skirt follow urge agent river deposit artwork doctor resource hamster voyage perfect allow betray gloom timber marine park actress globe tuition honey whisper approve'
console.log('mnemonic', mnemonic)
cosmos.setPath("m/44'/118'/0'/0/0");
const address = cosmos.getAddress(mnemonic);
const ecpairPriv = cosmos.getECPairPriv(mnemonic);
console.log('ecpairPriv', ecpairPriv.toString('hex'))
console.log('address', address)