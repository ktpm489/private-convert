const data = require('@polkadot/keyring')
  //  { text: 'Schnorrkel (sr25519)', value: 'sr25519' },
  //  { text: 'Edwards (ed25519)', value: 'ed25519' }
// const keyring = new data.Keyring();

// console.log(keyring.createFromUri('9B866C692D6DCBD9953321518AE33DC0FE29C8F135F735FA5B98C06FA85D8D93'));
const MNEMONIC = 'sample split bamboo west visual approve brain fox arch impact relief smile';

// type: ed25519
const keyring = new data.Keyring();

// our ed25519 pairs
console.log(keyring.createFromUri(MNEMONIC).address);
console.log(keyring.createFromUri(`${MNEMONIC}//hardA//hardB`).address);
console.log(keyring.createFromUri(`${MNEMONIC}//hard///password`).address);