import random from "crypto-random-prime";
import fs from 'fs'


function gcd(a, b) {
    while (b !== BigInt(0)) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function areRelativePrime(a, b) {
    return gcd(a, b) === 1n;
}

function modInverse (a, m) {
    let [m0, x0, x1] = [m, BigInt(0), BigInt(1)];
    while (a > BigInt(1)) {
      const q = a / m;
      [a, m] = [m, a % m];
      [x0, x1] = [x1 - q * x0, x0];
    }
    return x1 < BigInt(0) ? x1 + m0 : x1;
  };


  function generate_key(bitsize){
    let p = BigInt(random(bitsize));
    let q = BigInt(random(bitsize));

    const totient = (p - BigInt(1)) * (q - BigInt(1));

    let e = BigInt(random(bitsize));

    while (!areRelativePrime(e, totient)){
        p = BigInt(random(bitsize));
        q = BigInt(random(bitsize));
        e = BigInt(random(bitsize));
    }

    let n = p * q;
    let d = modInverse(e, totient);

    return {
        publicKey: { e, n },
        privateKey: { d, n },
    };
}

function encryptRSA(plain, d, n) {
    if (typeof plain !== "string") {
        if (plain instanceof ArrayBuffer) {
          plain = new Uint8Array(plain);
        } else if (plain instanceof Uint8Array) {
          plain = plain;
        }
      }
    
    
    let cipher=''

    if (typeof plain === "string"){
        for (let i=0; i < plain.length; i++){
            let char = BigInt(plain.charCodeAt(i));
            let encryptchar = modPow(char,d,n);
            cipher += encryptchar.toString() + " ";
        }
        
    }
    if (plain instanceof Uint8Array) {
        for (let i = 0; i < plain.length; i++) {
          const charCode = BigInt(plain[i]);
          const encryptedChar = modPow(charCode, d, n);
          cipher += encryptedChar.toString() + " ";
        }
      }

    return Buffer.from(cipher.trim()).toString("base64");
    
}

function decryptRSA(cipher,e,n) {
    const decodedCipher = Buffer.from(cipher, "base64").toString();
    const cipherChars = decodedCipher.trim().split(" ");

    let plain=''
    for (let i=0; i < cipherChars.length; i++){
        const cipherChar = BigInt(cipherChars[i]);
        const plainChar = modPow(cipherChar, e, n);
        plain += String.fromCharCode(Number(plainChar));
    }
    const isValidUTF8 = /^[\x00-\x7F]*$/.test(plain);
    return isValidUTF8
      ? plain
      : Uint8Array.from(plain.split("").map((c) => c.charCodeAt(0)));
};



function modPow(base, exp, mod) {
    let result = BigInt(1);
    base %= mod;
    while (exp > BigInt(0)) {
        if (exp & BigInt(1)) result = (result * base) % mod;
        exp >>= BigInt(1);
        base = (base * base) % mod;
    }
    return result;
}


/*function readFileAsUint8Array(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const uint8Array = new Uint8Array(data);
          resolve(uint8Array);
        }
      });
    });
  }

const key = generate_key(24);

console.log(key.publicKey.e); 
console.log(key.publicKey.n); 
console.log(key.privateKey.d); 
console.log(key.privateKey.n); 

var message = 'lucky you';
console.log(message); 

var encrypted = encryptRSA(message,key.privateKey.d,key.privateKey.n);
var decrypted = decryptRSA(encrypted,key.publicKey.e,key.publicKey.n);

console.log(encrypted);
console.log(decrypted);

const filePath = 'mandiri.png'
readFileAsUint8Array(filePath)
  .then(uint8Array => {
    let encryptedData = encryptRSA(uint8Array,key.privateKey.d,key.privateKey.n);
    console.log('Encrypted data:', encryptedData);
    let plain = decryptRSA(encryptedData,key.publicKey.e,key.publicKey.n)
    fs.writeFile('encrypted.png', plain, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('File saved successfully.');
    });
  })
  .catch(error => {
    console.error('Error reading file:', error);
  });*/










