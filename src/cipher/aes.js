import aes from 'js-crypto-aes';
import fs from 'fs';
import { TextEncoder, TextDecoder } from 'util';


function convertStringToUint8Array(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}


function importKey(rawKey) {
  return crypto.subtle.importKey(
    'raw',
    rawKey,
    { name: 'AES-CBC' },
    false,
    ['encrypt', 'decrypt']
  );
}


function generateIV() {
  return crypto.getRandomValues(new Uint8Array(16));
}

function encryptMessage(message, keyString, iv, callback) {
  const keyData = convertStringToUint8Array(keyString.padEnd(16, '0'));
  importKey(keyData)
    .then(key => {
      return crypto.subtle.encrypt(
        {
          name: 'AES-CBC',
          iv: iv,
        },
        key,
        message
      );
    })
    .then(encrypted => {
      callback(null, new Uint8Array(encrypted));
    })
    .catch(err => {
      callback(err, null);
    });
}


function decryptMessage(encryptedMessage, keyString, iv, callback) {
  const keyData = convertStringToUint8Array(keyString.padEnd(16, '0'));
  importKey(keyData)
    .then(key => {
      return crypto.subtle.decrypt(
        {
          name: 'AES-CBC',
          iv: iv,
        },
        key,
        encryptedMessage
      );
    })
    .then(decrypted => {
      callback(null, new Uint8Array(decrypted));
    })
    .catch(err => {
      callback(err, null);
    });
}


// Penggunaan
/*const keyString = "this_is_ken";
const iv = generateIV();
const message = new TextEncoder().encode("Nama Saya Ken Azizan 1 2 3");

console.log('Original message:', new TextDecoder().decode(message));

encryptMessage(message, keyString, iv, (err, encryptedMessage) => {
if (err) {
    console.error('Encryption error:', err);
    return;
}
console.log('Encrypted message (Base64):', Buffer.from(encryptedMessage).toString('base64'));

decryptMessage(encryptedMessage, keyString, iv, (err, decryptedMessage) => {
    if (err) {
    console.error('Decryption error:', err);
    return;
    }
    console.log('Decrypted message:', new TextDecoder().decode(decryptedMessage));
});
});

fs.readFile('mandiri.png', (err, data) => {
    if (err) throw err;
    const message = new Uint8Array(data);
  
    const keyString = "this_is_ken";
    const iv = generateIV();
  
    
    encryptMessage(message, keyString, iv, (err, encryptedMessage) => {
      if (err) {
        console.error('Encryption error:', err);
        return;
      }
      console.log('Encryption successful.');
  
      
      fs.writeFile('encrypted.png', encryptedMessage, (err) => {
        if (err) throw err;
        console.log('Encrypted file saved as encrypted.png.');
  
        
        fs.readFile('encrypted.png', (err, encryptedData) => {
          if (err) throw err;
  
          
          decryptMessage(new Uint8Array(encryptedData), keyString, iv, (err, decryptedMessage) => {
            if (err) {
              console.error('Decryption error:', err);
              return;
            }
            console.log('Decryption successful.');
  
           
            fs.writeFile('decrypted.png', decryptedMessage, (err) => {
              if (err) throw err;
              console.log('Decrypted file saved as decrypted.png.');
            });
          });
        });
      });
    });
  });*/
