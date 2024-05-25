import random from "crypto-random-prime";

function gcd(a: bigint, b: bigint): bigint {
  while (b !== BigInt(0)) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function areRelativePrime(a: bigint, b: bigint): boolean {
  return gcd(a, b) === BigInt(1);
}

function modInverse(a: bigint, m: bigint): bigint {
  let [m0, x0, x1] = [m, BigInt(0), BigInt(1)];
  while (a > BigInt(1)) {
    const q = a / m;
    [a, m] = [m, a % m];
    [x0, x1] = [x1 - q * x0, x0];
  }
  return x1 < BigInt(0) ? x1 + m0 : x1;
}

interface KeyPair {
  publicKey: { e: bigint; n: bigint };
  privateKey: { d: bigint; n: bigint };
}

function generateKeyRSA(bitsize: number): KeyPair {
  let p = BigInt(random(bitsize));
  let q = BigInt(random(bitsize));

  const totient = (p - BigInt(1)) * (q - BigInt(1));

  let e = BigInt(random(bitsize));

  while (!areRelativePrime(e, totient)) {
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

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = BigInt(1);
  base %= mod;
  while (exp > BigInt(0)) {
    if (exp & BigInt(1)) result = (result * base) % mod;
    exp >>= BigInt(1);
    base = (base * base) % mod;
  }
  return result;
}

function encryptRSA(plain: string | Uint8Array, d: bigint, n: bigint): string {
  let cipher = "";

  if (typeof plain === "string") {
    for (let i = 0; i < plain.length; i++) {
      const char = BigInt(plain.charCodeAt(i));
      const encryptchar = modPow(char, d, n);
      cipher += encryptchar.toString() + " ";
    }
  } else if (plain instanceof Uint8Array) {
    for (let i = 0; i < plain.length; i++) {
      const charCode = BigInt(plain[i]);
      const encryptedChar = modPow(charCode, d, n);
      cipher += encryptedChar.toString() + " ";
    }
  }

  return Buffer.from(cipher.trim()).toString("base64");
}

function decryptRSA(cipher: string, e: bigint, n: bigint): string | Uint8Array {
  const decodedCipher = Buffer.from(cipher, "base64").toString();
  const cipherChars = decodedCipher.trim().split(" ");

  let plain = "";
  for (const cipherCharStr of cipherChars) {
    const cipherChar = BigInt(cipherCharStr);
    const plainChar = modPow(cipherChar, e, n);
    plain += String.fromCharCode(Number(plainChar));
  }

  const isValidUTF8 = /^[\x00-\x7F]*$/.test(plain);
  return isValidUTF8
    ? plain
    : Uint8Array.from(plain.split("").map((c) => c.charCodeAt(0)));
}

export { generateKeyRSA, encryptRSA, decryptRSA };

// // Example usage:
// const key = generateKeyRSA(24);

// console.log(key.publicKey.e);
// console.log(key.publicKey.n);
// console.log(key.privateKey.d);
// console.log(key.privateKey.n);

// const message = 'lucky you';
// console.log(message);

// const encrypted = encryptRSA(message, key.privateKey.d, key.privateKey.n);
// const decrypted = decryptRSA(encrypted, key.publicKey.e, key.publicKey.n);

// console.log(encrypted);
// console.log(decrypted);

// const filePath = 'mandiri.png';
// readFileAsUint8Array(filePath)
//   .then(uint8Array => {
//     const encryptedData = encryptRSA(uint8Array, key.privateKey.d, key.privateKey.n);
//     console.log('Encrypted data:', encryptedData);
//     const plain = decryptRSA(encryptedData, key.publicKey.e, key.publicKey.n) as Uint8Array;
//     fs.writeFile('encrypted.png', Buffer.from(plain), (err) => {
//       if (err) {
//         console.error('Error writing file:', err);
//         return;
//       }
//       console.log('File saved successfully.');
//     });
//   })
//   .catch(error => {
//     console.error('Error reading file:', error);
//   });
