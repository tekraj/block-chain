import BlockChain from './src/block-chain';
import Transaction from './src/transaction';
let myCoin = new BlockChain();

myCoin.createTransaction(new Transaction('address1','address2',100));
myCoin.createTransaction(new Transaction('address2','address1',50));
myCoin.minePendingTransactions('my-address');
 console.log('My Balance',myCoin.getBalanceOfAddress('my-address'));
 myCoin.minePendingTransactions('my-address');
 console.log('My Balance',myCoin.getBalanceOfAddress('my-address'));
