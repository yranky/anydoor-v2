import JSEncrypt from "jsencrypt"

export default class Encrypt {
    //默认的公钥
    public_key: string = `
    -----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu9iViI4AiDMnJHoZtTEP
    BHrUpvJoRIl8Sm2oi5x0F2vSH2oEFxmTEyWbpEDkKrbUxCdtGSYZWL4GeKrlwH5m
    IUhpHaRUPodoGqsxgkMkk4v5noB7SBZbibdiE5v8U6nlg+ewpx7xR/QUCncZWFTz
    jmfWyMPJVquT74wivW9q7ELGZrI3g5mm0Q51LYTmdAOv/qtCd/M7kLRJhXf9UqOl
    IsGuZ7ztWYH9Y8o8tPBY1VcmWhSPkBzgjGpGLcsrigl0SoJK8wSwZf5xn8H5BW+z
    /4gD+sqwSHDkBKbEiXnMT9XACKkfN3A8L+LCFWjn7EktoxxZSnco8d4HdLLZJFNk
    1QIDAQAB
    -----END PUBLIC KEY-----
    

    `

    //默认的私钥
    private_key: string = `
    -----BEGIN RSA PRIVATE KEY-----
    MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC72JWIjgCIMyck
    ehm1MQ8EetSm8mhEiXxKbaiLnHQXa9IfagQXGZMTJZukQOQqttTEJ20ZJhlYvgZ4
    quXAfmYhSGkdpFQ+h2gaqzGCQySTi/megHtIFluJt2ITm/xTqeWD57CnHvFH9BQK
    dxlYVPOOZ9bIw8lWq5PvjCK9b2rsQsZmsjeDmabRDnUthOZ0A6/+q0J38zuQtEmF
    d/1So6Uiwa5nvO1Zgf1jyjy08FjVVyZaFI+QHOCMakYtyyuKCXRKgkrzBLBl/nGf
    wfkFb7P/iAP6yrBIcOQEpsSJecxP1cAIqR83cDwv4sIVaOfsSS2jHFlKdyjx3gd0
    stkkU2TVAgMBAAECggEAT2yOHUTdWLk4LaYqxH/Pt7cvvr7z8zamhNnEz/MA6v49
    w+aRgCriEtBt9I8zahQP9jgtWtrPEMSX++FWb4OCL0RsnYnjzOR30f7cWhWFm5Ut
    oCT2+03oulv9bgkgMUe+sXz/Jkpg/mlnJ92fq8ePi4DAQfb2ZFz7meeIsMwxS19d
    f++ib+dYZmRr5bKEGqmlApK+UDBzloETEs/6HQX1bEhMd9IYymUIUqSJ+/Trl19Q
    /87nyr9tKEkmD++qPjGGx9BZCDs9iEjqA6EbauovmZo2LUQpxMoos+ZcwoGR0FNF
    to1Utx/DuQ76iIJnGgXZBDgf3d09xQIw2ne+Q4p/gQKBgQD5n9mRGR3KyFfhJtcw
    3TZPS7Xe7AYYenTLtjp1AoHHGQKeIWommr0XosfhL5bj7Oxh8H0SB6Rgqlf2+qEy
    JqxH6KpSb/YoIL8CRNSw343jGquIFQNH986JaQVWEO8xBKBSvrkiArmZu1RVUIHk
    oWfMIOckKwZhfEgD8j/IomTAEQKBgQDApM0PvVZK9FNMVXrAWa6wuKbaYfB3Cbbk
    7mINmPMnNIFANAHgxl1mlESqfMSJGcLOnrIemd1nXd167NMAOdkb0HlXf02rsgln
    vNObhDFa5rqsRoDaN6diZ5uWMEZGgN/laPNqA2TF9e0pIRgqXhs0XlVR5EkAWROC
    5ymcfx3chQKBgDDv1YdMlTqb7B6Hrsg1leAVx6HcQ5Wo7BzDrNIjm62ciZbWlijb
    TRbFIspSuhIU8IKC0wIl3WPWAUi5+cALNNskEb/3kxpq0Qdw1wGV0gsjv1z+QZZq
    TmNB43nr9/h0H7oZCdJRFnG899uB3PUlb2PlT2sXxDh4VOXxJ+/9ZiMBAoGBAIDK
    7UnTlKih9jq3f0yv6Km/mdWw2tpKxVsCwM1Eb3PLl4n7+zFyjSkygUHWDnN2pJYM
    5RquVaZwy80OHfcttafx1d4Yfy4F5mHTjUmQtIqIbU8WB7lcseyJRiy/84vZR1cR
    toMu56WtyDPSK1zP87IsSzBnxiKUawX+VASLu8QdAoGBAKs7sG1vivaEDhGBbBEu
    8CrU0gkwMqPy1cWxs0YrFyj0xqtiUL6L7OFzSopMVHmkmaNpPmN52Rg6GXviq1Dl
    9QuyI7Njvg7r17RNzy8epI8sBEglZy17tTyWRxYzpcXon9y5uX5TtABeI05V+2It
    B3nYEGog7dZB5ybwUuA5n/A4
    -----END RSA PRIVATE KEY-----
    
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