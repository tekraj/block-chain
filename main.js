import BlockChain from './src/block-chain';
import Transaction from './src/transaction';
const EC = require("elliptic").ec;
const ec = EC('secp256k1');

import {privateKey,publicKey} from './src/keys';
const myKey = ec.keyFromPrivate(privateKey);
const myWalletAddress = myKey.getPublic('hex');

let myCoin = new BlockChain();

const tx1 = new Transaction(myWalletAddress,publicKey,10);
tx1.signTransaction(myKey);
myCoin.createTransaction(tx1);
console.log('Mining');
myCoin.minePendingTransactions(myWalletAddress);
console.log(myCoin.getBalanceOfAddress(myWalletAddress));

