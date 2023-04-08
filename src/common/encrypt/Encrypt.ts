import JSEncrypt from "jsencrypt"

export default class Encrypt {
    //默认的公钥
    public_key: string = `
    -----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvqtpip8xql7kKqox9pgv
dLRs+TiOdBXDPnBZRaBpATT3IySFwpclppmXv2EVlAzdAJtQ/mHgrhG/ibEhH17U
9e/ERUvbzPHvL+4kCS6FFSmcRX96oRjdBGcP4I/XSDJfL980J1vpuMMuDikLrTqF
XXIz7C9uQnOSR2fqzmFbRvUhUo1mdlJ5fDUhKFHlxwPF8PmxGA5+Y6Qm/aWDSGxE
T+dbWWvdACFEauTfnZ2nOoA/NU7xE2dZIoTtPnkwDpqUUZSAetAC0sbnIRd5mAdt
U/+bvnH4SYvP64B9IYGEvqVxc7lET1WpDXIQkvX6y/lpB+EpNysIrfD61rmWsJxT
nwIDAQAB
-----END PUBLIC KEY-----

    `

    //默认的私钥
    private_key: string = `
    -----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+q2mKnzGqXuQq
qjH2mC90tGz5OI50FcM+cFlFoGkBNPcjJIXClyWmmZe/YRWUDN0Am1D+YeCuEb+J
sSEfXtT178RFS9vM8e8v7iQJLoUVKZxFf3qhGN0EZw/gj9dIMl8v3zQnW+m4wy4O
KQutOoVdcjPsL25Cc5JHZ+rOYVtG9SFSjWZ2Unl8NSEoUeXHA8Xw+bEYDn5jpCb9
pYNIbERP51tZa90AIURq5N+dnac6gD81TvETZ1kihO0+eTAOmpRRlIB60ALSxuch
F3mYB21T/5u+cfhJi8/rgH0hgYS+pXFzuURPVakNchCS9frL+WkH4Sk3Kwit8PrW
uZawnFOfAgMBAAECggEAYK1tcFpTxn0i1/dAKjb0KQqrDpr8sCOwweIZgdJaK8B9
ZxZHtGkLMDRE20cQt+bl0D7wjGt4jwp0wg5MKyncdW9DZ5eVNY+epgDryLQLyrU0
hZCjzzdaKbdQN573m6Xe2dklCqfyFDrzCT8KqqU3pjAX37QVBiCvlQE977MxowIa
mIb0IyQkXQZpaoK7ISX0w7LQ/Azv0HTC2/DR7/1X7nRAzSSfOJWDTpVn/uM0nOD7
FMJetYZcfm0v5pz6b6/Pime3xJvXScatWSnaRfntSZH3nGWLPmc3Yiz5xRA4sgq/
68HymgVRKs3/RKUW9to8Ll5ZW/AVRCMeqrfCFPl3EQKBgQD2+h5+ru1+yW0naPAh
dAIb7N3qjdhPoHHLxgKBqtPvFL3WdvhObSWvbOEZIzP6BhWn3/qK3D3gLhUS6oDl
F1mNjb1j1ReuhzX3GhnCiusXtDcDV1F7+WTSX7UChdp/pBF3yPDxgtKfuCs2vH99
4TiPxUdYacVJDDUajOqwr/G2jQKBgQDFoqvad0GrI5syfL4AI1t6BgW01GaQZ/py
YpyJNo2v0J22+tio7XOUGQzE26w6ABBdFBzjoq8+F1KTWJHuVEjAbUkBOBDk1p8a
pXtDCDWf0QBweoA/ZCXl6k2k5ute4gFHOdRG72VKUnatEsArv9VdJV5ESARJAXWY
Wchj5NAN2wKBgCkxkLKKlLxH9nfTTfIWel+UA3Oi0wh8914ImdRs3MqMyBkkYMgb
9mQrIeRidcHnD+efORe+Imfo58Tu7i7H1T0B/ivPmBKZJMwhQ1iqeQnMGjzpbILk
FwfrxLI2Bzqw7+Tt1BpEOsM/IZ4QlKc3UIrSWdMKWUiUy6qxBFgSEJvlAoGBAMFu
gELXO+eTdt+IJbIe6PZaFJWy2Rt3GTGBAHJveWddiC9B/nH/zYJirhOyaTNvQpTH
DatiW6Aq1YAvTMz1oyrrC2vtAuPmh1xeIHEwBMQBnCt6SjFBBLKtiwbdl/qKuvOK
TxCKWBnQ8iRc2Mc4/0wmOcgcsEz/56eQIEhc96DHAoGAAewZ1YIYDEp7I6NU0O8N
MJSe7R7Jeu0/C2AmjZLJ9SOGsDh/34v5ClmH6CiMiYT6GhdnIYEhTIAP2xvUA/+y
E7tXaljP8O9Jj73fh1dt7TJOpkWRnAe1EH/s87AdegNw2mfeHnWWjv/9pgdnYz2J
NQmluR4P/gEaBCbuy3g5Om8=
-----END PRIVATE KEY-----
    `
    //加密
    encrypt(text: string): boolean | string {
        const encryptData = new JSEncrypt()
        encryptData.setPublicKey(this.public_key)
        return encryptData.encrypt(text)
    }
    //解密
    decrypt(text: string): boolean | string {
        const decryptData = new JSEncrypt()
        decryptData.setPrivateKey(this.private_key)
        return decryptData.decrypt(text)
    }

    //设置公钥
    setPublicKey(public_key: string): void {
        this.public_key = public_key
    }
    //设置私钥
    setPrivateKey(private_key: string): void {
        this.private_key = private_key
    }
}