const { verifyUtf8 } = require('./test_pgp')


let signature = '-----BEGIN PGP MESSAGE-----\n'+
'Version: DidiSoft OpenPGP Library for .NET 1.9.1\n\n' +

'owEBbgGR/pANAwACAee67n1ei9n+AcspYghzaWduLnR4dF4/AKBJbnRlcm5ldGJh\n' +
'bmtpbmdfTkRLX0ZpdmVTYW+JATEEAAECABsFAl4/AKAUHGZha2VlbWFpbEBnbWFp\n' +
'bC5jb20ACgkQ57rufV6L2f4WiAf/XsLC1NA1bT3mNW+8If8SV1G+4JhOjryDFlgC\n' +
'KtA4rtybBMK5/92uyIerJhZ9G+rf+/FNoTPC0MkjTaPAzdHT622n8J4qTh90R2Y6\n' +
'bpF2Dk1ok+JGgE3SxkBXrzW3SU08qspOKpCryvEnh5poCA/X2HxuOHAZRFabsm0j\n' +
'Dm2wtQgv12RtRmR6bQ4wfIcuOleuTSFR5P8NJNy0RMv8ojILiNdCXwOXqRa4amXY\n' +
'yhsczHb4UGHiPafF6MvM/Z2sJWo8AHNuye8MP1T7uV+H9yQ63dFzQzj3u4z5ZNrP\n' +
'x0cA7qnbdMsuhLZXzwshqOri4zyxtePJAHalSTKXyGfxWVNlkQ==\n'+
'=ClYy\n' +
'-----END PGP MESSAGE-----\n'

signature = `-----BEGIN PGP MESSAGE-----
Version: DidiSoft OpenPGP Library for .NET 1.9.2

owEBbgGR/pANAwAKAee67n1ei9n+AcspYghzaWduLnR4dF61KNhJbnRlcm5ldGJh
bmtpbmdfTkRLX0ZpdmVTYW+JATEEAAEKABsFAl61KNgUHGZha2VlbWFpbEBnbWFp
bC5jb20ACgkQ57rufV6L2f7zdwf+MAkG1FzVBxKj8D+nvKA2IJBtwrNjunAY/Lwh
bb/dRg8NLLMvquzbeqdPb9QwYKXSF+thR1Ch1+Mbp9MxLVnoHoLPSKPz96e5ltwa
A5AkrgGb4Xud/5HxSp6XKzd8gETFicelF1MsRxZ9PzxXWq1Hde+TKlQ11teVbeci
6nM/n8p21WiRk5KCnElqr5BzzXdYvHw8elgHINfSdwj0zBSBMcme6Hkqw3CIUx0n
r6URncSOo0Ej/onyosVjJ9h7w76POTDSr5cW0iCDEtZ7vcfg5/3IcgUlc7RyyCsL
h+8gx9aWStB08WQPy68tB9/ntsUh3nMN5ytGlkP4g6DctWvW8A==
=o5hx
-----END PGP MESSAGE-----`;

const test = async () => { 
  console.log(signature)
  try {
    await verifyUtf8(signature)
  } catch (ex) {
    console.log(ex)
  }
}
test()