const Crypto = require ('cryptojs').Crypto
const BigInteger = require('bigi')
function privkey2wif(h) {
    let priv = 0x80;
    var r = Crypto.util.hexToBytes(h);
    r.unshift(priv);
    var hash = Crypto.SHA256(Crypto.SHA256(r, { asBytes: true }), { asBytes: true });
    var checksum = hash.slice(0, 4);

    return base58encode(r.concat(checksum));
}
function base58encode(buffer) {
    var alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    var base = BigInteger.valueOf(58);

    var bi = BigInteger.fromByteArrayUnsigned(buffer);
    var chars = [];

    while (bi.compareTo(base) >= 0) {
        var mod = bi.mod(base);
        chars.unshift(alphabet[mod.intValue()]);
        bi = bi.subtract(mod).divide(base);
    }

    chars.unshift(alphabet[bi.intValue()]);
    for (var i = 0; i < buffer.length; i++) {
        if (buffer[i] == 0x00) {
            chars.unshift(alphabet[0]);
        } else break;
    }
    return chars.join('');
}


function wif2address(wif) {
    var r = wif2pubkey(wif);
    return { 'address': pubkey2address(r['pubkey']), 'compressed': r['compressed'] };
}

function pubkey2address(h, byte) {
    let pub = 0x00;
    var r = ripemd160(Crypto.SHA256(Crypto.util.hexToBytes(h), { asBytes: true }));
    r.unshift(byte || pub);
    var hash = Crypto.SHA256(Crypto.SHA256(r, { asBytes: true }), { asBytes: true });
    var checksum = hash.slice(0, 4);
    return base58encode(r.concat(checksum));
}

function base58decode(buffer) {
    var alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    var base = BigInteger.valueOf(58);
    var validRegex = /^[1-9A-HJ-NP-Za-km-z]+$/;

    var bi = BigInteger.valueOf(0);
    var leadingZerosNum = 0;
    for (var i = buffer.length - 1; i >= 0; i--) {
        var alphaIndex = alphabet.indexOf(buffer[i]);
        if (alphaIndex < 0) {
            throw "Invalid character";
        }
        bi = bi.add(BigInteger.valueOf(alphaIndex).multiply(base.pow(buffer.length - 1 - i)));

        if (buffer[i] == "1") leadingZerosNum++;
        else leadingZerosNum = 0;
    }

    var bytes = bi.toByteArrayUnsigned();
    while (leadingZerosNum-- > 0) bytes.unshift(0);
    return bytes;
}

function wif2privkey(wif) {
    var compressed = false;
    var decode = base58decode(wif);
    var key = decode.slice(0, decode.length - 4);
    key = key.slice(1, key.length);
    if (key.length >= 33 && key[key.length - 1] == 0x01) {
        key = key.slice(0, key.length - 1);
        compressed = true;
    }
    return { 'privkey': Crypto.util.bytesToHex(key), 'compressed': compressed };
}


function wif2pubkey(wif) {
    var r = wif2privkey(wif);
    var pubkey = newPubkey(r['privkey'], r['compressed']);
    return { 'pubkey': pubkey, 'compressed': r['compressed'] };
}

function newPubkey(hash, compressed) {
    var privateKeyBigInt = BigInteger.fromByteArrayUnsigned(Crypto.util.hexToBytes(hash));
    var curve = EllipticCurve.getSECCurveByName("secp256k1");

    var curvePt = curve.getG().multiply(privateKeyBigInt);
    var x = curvePt.getX().toBigInteger();
    var y = curvePt.getY().toBigInteger();

    var publicKeyBytes = EllipticCurve.integerToBytes(x, 32);
    publicKeyBytes = publicKeyBytes.concat(EllipticCurve.integerToBytes(y, 32));
    publicKeyBytes.unshift(0x04);

    if (compressed) {
        var publicKeyBytesCompressed = EllipticCurve.integerToBytes(x, 32)
        if (y.isEven()) {
            publicKeyBytesCompressed.unshift(0x02)
        } else {
            publicKeyBytesCompressed.unshift(0x03)
        }
        return Crypto.util.bytesToHex(publicKeyBytesCompressed);
    } else {
        return Crypto.util.bytesToHex(publicKeyBytes);
    }
}


function getDataBTCFromETHKey(wif) {
    var cc = privkey2wif(wif)
    console.log('privateBTCKEY', cc)
    // var dd = wif2address(cc);
    // console.log('btcAddress', dd['address'])
}


getDataBTCFromETHKey('f8078e94e471a5db754725de92213e9991c3105f8c9c71a57ed7c53c38e9af2b')