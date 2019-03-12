'use strict'; 
import SHA256  from 'crypto-js/sha256'
class Block{
    constructor(timestamp,transactions,data,previousHash=''){
        this.transactions = transactions;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256( this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce ).toString();
    }

    mineBlock(difficulty){
        let test;
        while(this.hash.substring(0,difficulty)!== Array(difficulty+1).join('0')){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('Block Mined'+this.hash);
    }
}

export default Block;