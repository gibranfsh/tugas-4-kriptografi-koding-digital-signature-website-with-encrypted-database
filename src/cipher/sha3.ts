import pkg from "js-sha3";
const { sha3_256, keccak_256 } = pkg;

export function keccakHash(plain: string) {
  let cipher = keccak_256(plain);
  return cipher;
}

console.log(keccakHash("apa kabar"));
