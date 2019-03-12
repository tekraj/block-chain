import SHA256  from 'crypto-js/sha256';
const EC = require("elliptic").ec;
const ec = EC('secp256k1');
class Transaction{
    constructor(fromAddress,toAddress,amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
    calculateHash(){
        return new SHA256(this.fromAddress+this.toAddress+this.amount).toString();
    }

    signTransaction(signingKey){
        if(signingKey.getPublic('hex')!==this.fromAddress){
            throw new Error('You can not sign transaction from other wallet');
        }
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx,'base64');
        this.signature = sig.toDER('hex');

    }

    isValid(){
        if(this.fromAddress===null){
            return true;
        }

        if(!this.signature || this.signature.length===0){
            throw new Error('No signature found in this transaction');
        }
        const publicKey = ec.keyFromPublic(this.fromAddress,'hex');
        return publicKey.verify(this.calculateHash(),this.signature);
    }
}
export default Transaction;