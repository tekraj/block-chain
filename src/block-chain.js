'use strict'; 
import Block from './block';
import Transaction from './transaction';
class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions =[];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block('2017-01-01','Genesis Block',"0");
    }

    getLatesBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatesBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i=1;i<this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(!currentBlock.hasValidTransaction()){
                return false;
            }
            if(currentBlock.hash!==currentBlock.calculateHash()){
                console.log(currentBlock.calculateHash());
                return false;
            }

            if(currentBlock.previousHash!==previousBlock.hash){
                console.log(currentBlock);
                return false;
            }
        }

        return true;
    }

    minePendingTransactions(miningRewardAddress){
        let block =  new Block(Date.now(),this.pendingTransactions);
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.pendingTransactions = [
            new Transaction(null,miningRewardAddress,this.miningReward)
        ];
    }

    createTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include to and from address');
        }

        if(!transaction.isValid()){
            throw new Error('Can not add invalid transaction to chain');
        }
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress===address){
                    balance -=trans.amount;
                }
                if(trans.toAddress===address){
                    balance +=trans.amount;
                }
            }
        }

        return balance;
    }
}

export default BlockChain;