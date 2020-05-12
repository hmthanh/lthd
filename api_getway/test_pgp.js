const {writeFileSync, existsSync, unlinkSync, readFileSync} = require('fs')
const {resolve} = require('path')
const openpgp = require('openpgp')
const privateKeyFileName = 'private.pgp'
const publicKeyFileName = 'public.pgp'
const encoding = 'utf8'

const curve = 'ed25519'  // ECC curve name
const users = [{name: 'New Vimo', email: 'technical.vimoteam@vimo.com.vn'}] // you can pass multiple user IDs
const secret_key = '51PtusxuzDh1mH8iQwISiRu2ffG6itcF' // protects the private key (key for Encryption private key)

let generatePgpKeyPair = async () => {
    if (!existsSync(privateKeyFileName)) {
        const {privateKeyArmored, publicKeyArmored, _} = await openpgp.generateKey({
            userIds: users,
            // curve: curve,
            // passphrase: secret_key
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
        const {keys: [privateKey]} = await openpgp.key.readArmored(privateKeyString)

        await privateKey.decrypt(secret_key)
        let {data: cleartext} = await openpgp.sign({
            message: openpgp.cleartext.fromText(textData), // CleartextMessage or Message object
            privateKeys: [privateKey]                             // for signing
        })
        return cleartext
    },
    verify: async textData => {
        const publicKeyPath = resolve(publicKeyFileName)
        const publicKeyString = readFileSync(publicKeyPath, encoding)

        const {signatures} = await openpgp.verify({
            message: await openpgp.cleartext.readArmored(textData),           // parse armored message
            publicKeys: (await openpgp.key.readArmored(publicKeyString)).keys // for verification
        });
        return signatures[0];
    },
    verifyUtf8: async sugnature => {
      const publicKeyPath = resolve(publicKeyFileName)
      const publicKeyString = readFileSync(publicKeyPath, encoding)
  
      const verified = await openpgp.verify({
          message: await openpgp.message.readArmored(sugnature),       // parse armored signature
          publicKeys: (await openpgp.key.readArmored(publicKeyString)).keys  // for verification
      });
  
      await openpgp.stream.readToEnd(verified.data);
      // Note: you *have* to read `verified.data` in some way or other,
      // even if you don't need it, as that is what triggers the
      // verification of the data.
  
      const { valid } = verified.signatures[0];
      console.log(verified)
      if (valid) {
          console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
      } else {
          // throw new Error('signature could not be verified');
      }
    }
}