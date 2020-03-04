// const crypto = require('crypto')

const NodeRSA = require('node-rsa')


const myPrivateKey = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----' +
    'MIICWQIBAAKBgHLBhWI3qNtooLufc/MiuaJ/FxLBZ1FAmSuu6/cd4fN2+35BXTn4' +
    'fQ2dsSXciuPih0lwJ1ko87W0WpQ/SESLoblKsnNyd9YmvhESi1wqFre5tQM7Stna' +
    'auHkumrbFM/ft345wt0U549O+teTJXJ39zfazpoRLsAUS8/DnQ8hfBIPAgMBAAEC' +
    'gYAZUkRZWMjEqUCWRefy5V2q0npH5C8lCakCr5VXsNtTupRh1pB4ozEM2Rfmr9Rh' +
    '1nFdrgawsM2d8Y7vGUub/GeRyv8TnC2kie+pZqHEpNSkaWeydj5N5o5o5nvU+uD3' +
    'qN7jXMg4Ucc9d8qNJwOHojy7y8y8EbELWCGlZ3SH1qReIQJBANKRqVNoG9f0+Fp4' +
    'OoCbZ4bfMuJeUdeZhYSTSDHMXQsnA9jkbVXlHxSwo9l3fWIFWkzGsTurfIxP5PKr' +
    '7GfvIbECQQCLg9NtsVdtbO4M1Sq3G5cLVp8nAZhV37En+A4zs7fJGdj4YHGodsbY' +
    'zN4IqENoL3h2Y2ZbYRQ+cmR8UuKetZ+/Aj8mqJdtuK9j9pWiBnC3K9DV8iRlauub' +
    'qZPZwzB99AchBQivyUBJhMcwBT4PruBWHqV1cwUW72TuXbyq0OWWL1ECQDe+opov' +
    'w+kbHzrNadXkFkQXhlwFjSKy0IxR1wrdgk++Hi2QC5nua6Fwqj73TIeygAV9zgYx' +
    'Ee+psXDjhV044O0CQDidvMJ7772PV0/pT2vjRm8vibncXRxQcI0BO4tWG9+rJk0S' +
    'fQDd6sqQ+XxDqXVn5cm1EyPUzjaA8VD0djLwEFQ=' +
    '-----END RSA PRIVATE KEY-----')

myPrivateKey.sign("12314421421");