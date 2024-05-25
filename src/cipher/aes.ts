import fs from 'fs';
import { TextEncoder, TextDecoder } from 'util';
import { subtle, getRandomValues } from 'crypto';

// Convert string to Uint8Array
function convertStringToUint8Array(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

// Import key for AES encryption
async function importKey(rawKey: Uint8Array): Promise<CryptoKey> {
  return subtle.importKey(
    'raw',
    rawKey,
    { name: 'AES-CBC' },
    false,
    ['encrypt', 'decrypt']
  );
}

// Generate initialization vector (IV)
function generateIV(): Uint8Array {
  return getRandomValues(new Uint8Array(16));
}

// Encrypt message
async function encryptMessage(
  message: Uint8Array,
  keyString: string,
  iv: Uint8Array
): Promise<Uint8Array> {
  const keyData = convertStringToUint8Array(keyString.padEnd(16, '0'));
  const key = await importKey(keyData);
  const encrypted = await subtle.encrypt(
    {
      name: 'AES-CBC',
      iv: iv,
    },
    key,
    message
  );
  return new Uint8Array(encrypted);
}

// Decrypt message
async function decryptMessage(
  encryptedMessage: Uint8Array,
  keyString: string,
  iv: Uint8Array
): Promise<Uint8Array> {
  const keyData = convertStringToUint8Array(keyString.padEnd(16, '0'));
  const key = await importKey(keyData);
  const decrypted = await subtle.decrypt(
    {
      name: 'AES-CBC',
      iv: iv,
    },
    key,
    encryptedMessage
  );
  return new Uint8Array(decrypted);
}

// Usage example with text
const keyString = "this_is_ken";
const iv = generateIV();
const message = new TextEncoder().encode("Nama Saya Ken Azizan 1 2 3");

console.log('Original message:', new TextDecoder().decode(message));

encryptMessage(message, keyString, iv)
  .then(encryptedMessage => {
    console.log('Encrypted message (Base64):', Buffer.from(encryptedMessage).toString('base64'));

    return decryptMessage(encryptedMessage, keyString, iv);
  })
  .then(decryptedMessage => {
    console.log('Decrypted message:', new TextDecoder().decode(decryptedMessage));
  })
  .catch(err => {
    console.error('Error:', err);
  });

// Usage example with file
// fs.readFile('mandiri.png', (err, data) => {
//   if (err) throw err;
//   const message = new Uint8Array(data);

//   encryptMessage(message, keyString, iv)
//     .then(encryptedMessage => {
//       console.log('Encryption successful.');

//       fs.writeFile('encrypted.png', encryptedMessage, err => {
//         if (err) throw err;
//         console.log('Encrypted file saved as encrypted.png.');

//         fs.readFile('encrypted.png', (err, encryptedData) => {
//           if (err) throw err;

//           decryptMessage(new Uint8Array(encryptedData), keyString, iv)
//             .then(decryptedMessage => {
//               console.log('Decryption successful.');

//               fs.writeFile('decrypted.png', decryptedMessage, err => {
//                 if (err) throw err;
//                 console.log('Decrypted file saved as decrypted.png.');
//               });
//             })
//             .catch(err => {
//               console.error('Decryption error:', err);
//             });
//         });
//       });
//     })
//     .catch(err => {
//       console.error('Encryption error:', err);
//     });
// });
