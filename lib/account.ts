// import { bech32 } from 'bech32'
// import { Buffer } from 'buffer'
// import { getPublicKey } from './keys'
import { generateSeedWords, keypairFromSeed, seedFromWords } from './nip06'

export const createNewAccount = () => {
  const mnemonic = generateSeedWords()
  const seed = seedFromWords(mnemonic)
  const { privateKey, publicKey } = keypairFromSeed(seed)
  return {
    mnemonic,
    privateKey,
    publicKey,
  }
}

// export const getKeysForMnemonic = (mnemonic: string) => {
//   const seed = seedFromWords(mnemonic)
//   const privateKey = privateKeyFromSeed(seed)
//   const publicKey = getPublicKey(Buffer.from(privateKey, 'hex'))
//   return {
//     privateKey,
//     publicKey,
//   }
// }

// export const getKeysForNsec = (nsec: string) => {
//   const decoded = bech32.decode(nsec)
//   const privateKey = bech32.fromWords(decoded.words)
//   if (privateKey.length !== 32) {
//     throw new Error('Invalid private key')
//   }
//   const publicKey = getPublicKey(Buffer.from(privateKey))
//   const hexKey = toHexString(privateKey)
//   return {
//     privateKey: hexKey,
//     publicKey,
//   }
// }

// function toHexString(byteArray) {
//   return Array.from(byteArray, function (byte: any) {
//     return ('0' + (byte & 0xff).toString(16)).slice(-2)
//   }).join('')
// }
