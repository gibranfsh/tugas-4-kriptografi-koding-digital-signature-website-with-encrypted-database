import fs from 'fs';

function encryptExtendedVigenere(input, inputKey) {
  if (typeof input === 'string') {
    let key = "";
    let cipherText = "";

    for (let i = 0; i < input.length; i++) {
      key += inputKey[i % inputKey.length];
      let cipher = (input.charCodeAt(i) + key.charCodeAt(i)) % 256;
      cipherText += String.fromCharCode(cipher);
    }

    return cipherText;
  } else if (input instanceof Uint8Array) {
    const keyArray = new Uint8Array(input.length);
    const cipherArray = new Uint8Array(input.length);

    for (let i = 0; i < input.length; i++) {
      keyArray[i] = inputKey.charCodeAt(i % inputKey.length);
      cipherArray[i] = (input[i] + keyArray[i]) % 256;
    }

    return cipherArray;
  } else {
    throw new Error('Input harus string atau Uint8Array');
  }
}

function decryptExtendedVigenere(input, inputKey) {
  if (typeof input === 'string') {
    let key = "";
    let plainText = "";

    for (let i = 0; i < input.length; i++) {
      key += inputKey[i % inputKey.length];
      let cipher = (input.charCodeAt(i) - key.charCodeAt(i) + 256) % 256;
      plainText += String.fromCharCode(cipher);
    }

    return plainText;
  } else if (input instanceof Uint8Array) {
    const keyArray = new Uint8Array(input.length);
    const plainArray = new Uint8Array(input.length);

    for (let i = 0; i < input.length; i++) {
      keyArray[i] = inputKey.charCodeAt(i % inputKey.length);
      plainArray[i] = (input[i] - keyArray[i] + 256) % 256; // +256 to ensure non-negative
    }

    return plainArray;
  } else {
    throw new Error('Input harus string atau Uint8Array');
  }
}



function ksa(key) {
    const s = Array.from({ length: 256 }, (_, i) => i);
    let j = 0;

    for (let i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        swap(s, i, j);
    }

    return s;
}

function prga(s, plain) {
    let i = 0;
    let j = 0;
    const cipher = [];

    for (let idx = 0; idx < plain.length; idx++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        swap(s, i, j);
        const t = (s[i] + s[j]) % 256;
        const u = s[t];
        const cipherChar = u ^ plain[idx];
        cipher.push(cipherChar);
    }

    return cipher;
}


function rc4ModifiedEncrypt(plain, key) {

    const vigenereEncrypted = encryptExtendedVigenere(plain, key);
  

    let plainBinary;
    if (typeof vigenereEncrypted === 'string') {
      plainBinary = textToBinary(vigenereEncrypted);
    } else if (vigenereEncrypted instanceof Uint8Array) {
      plainBinary = vigenereEncrypted;
    } else {
      throw new Error('Plain text harus string atau Uint8Array');
    }
  
    const s = ksa(key);
    const resultBinary = prga(s, plainBinary);
    return (plain instanceof Uint8Array) ? new Uint8Array(resultBinary) : Buffer.from(resultBinary).toString('base64');
  }
  

  function rc4ModifiedDecrypt(cipher, key) {
    let cipherBinary;
    if (typeof cipher === 'string') {
      cipherBinary = Buffer.from(cipher, 'base64');
    } else if (cipher instanceof Uint8Array) {
      cipherBinary = cipher;
    } else {
      throw new Error('Cipher text harus string atau Uint8Array');
    }
  
    const s = ksa(key);
    const resultBinary = prga(s, cipherBinary);
  
    const rc4Decrypted = (cipher instanceof Uint8Array) ? new Uint8Array(resultBinary) : binaryToString(resultBinary);
    return decryptExtendedVigenere(rc4Decrypted, key);
  }


function textToBinary(string) {
    const binaryArray = [];
    for (let i = 0; i < string.length; i++) {
        binaryArray.push(charToAscii(string[i]));
    }
    return binaryArray;
}

function charToAscii(ch) {
    return ch.charCodeAt(0);
}

function asciiToChar(ascii) {
    return String.fromCharCode(ascii);
}

function binaryToString(array) {
    return array.map(asciiToChar).join('');
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr;
}


/*const plainText = "Sistem dan Teknologi Informasi";
const key = "samplekey";
const encrypted = rc4ModifiedEncrypt(plainText, key);
console.log("Encrypted Text:", encrypted);

const decrypted = rc4ModifiedDecrypt(encrypted, key);
console.log("Decrypted Text:", decrypted);

const filePath = 'mandiri.png';
const inputKey = 'samplekey';

fs.readFile(filePath, (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const encryptedData = rc4ModifiedEncrypt(new Uint8Array(data), inputKey);
    fs.writeFile('encrypted.png', encryptedData, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('File encrypted successfully.');
    });

    const decryptedData = rc4ModifiedDecrypt(encryptedData, inputKey);
    fs.writeFile('decrypted.png', decryptedData, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('File decrypted successfully.');
    });
});*/