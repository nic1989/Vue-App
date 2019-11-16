var CryptoJS = require("crypto-js");

const HashService = {
    /**
     * create a encrypt token. 
     * 
     * @returns access_token
     * @throws AuthenticationError 
    **/
    encrypt: function(data) {
        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.VUE_APP_PASSPHRASE)
        return encrypted.toString();
    },

    /**
     * decrypt the token.
    **/
    decrypt: function(encryptedToken) {
        var bytes  = CryptoJS.AES.decrypt(encryptedToken.toString(), process.env.VUE_APP_PASSPHRASE);
        var decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decrypted
    }
}

export default HashService