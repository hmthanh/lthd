const { writeFileSync, existsSync, unlinkSync, readFileSync } = require('fs')
const {resolve} = require('path')
const openpgp = require('openpgp')
const privateKeyFileName = 'private.pgp'
const publicKeyFileName = 'public.pgp'
const encoding = 'utf8'

const curve = 'Curve25519'  // ECC curve name
const users = [{ name: 'New Vimo', email: 'technical.vimoteam@vimo.com.vn' }] // you can pass multiple user IDs
const secret_key = '51PtusxuzDh1mH8iQwISiRu2ffG6itcF' // protects the private key (key for Encryption private key)

let generatePgpKeyPair = async() => {
  if (!existsSync(privateKeyFileName)) { 
    console.log('******************************************************\n' +
                '*************Generate PGP Key Pair********************\n' +
                '******************************************************')
    const { privateKeyArmored, publicKeyArmored, _ } = await openpgp.generateKey({
        userIds: users,
        curve: curve,                                          
        passphrase: secret_key          
    })
    
    writeFileSync(privateKeyFileName, privateKeyArmored)
    writeFileSync(publicKeyFileName, publicKeyArmored)
  }
}

generatePgpKeyPair()

module.exports = {
  sign: async textData => {
    const privateKeyPath = resolve(privateKeyFileName)
    const privateKeyString = readFileSync(privateKeyPath, encoding)
    const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyString)
   
    await privateKey.decrypt(secret_key)
    let { data: cleartext } = await openpgp.sign({
      message: openpgp.cleartext.fromText(textData), // CleartextMessage or Message object
      privateKeys: [privateKey]                             // for signing
    })
    return cleartext
  },
  verify: async textData => {
    const publicKeyPath = resolve(publicKeyFileName)
    const publicKeyString = readFileSync(publicKeyPath, encoding)

    const { signatures } = await openpgp.verify({
      message: await openpgp.cleartext.readArmored(textData),           // parse armored message
      publicKeys: (await openpgp.key.readArmored(publicKeyString)).keys // for verification
    });
    const { valid } = signatures[0];
    return valid;
  }
}