<template>
    <div class="bg-main text-white min-h-screen flex flex-col justify-between items-center">
        <slot></slot>
    </div>
</template>

<script>
import { provide, reactive } from 'vue'
import { ethers } from 'ethers'

import { contractABI, contractAddress } from '../utils/constants'

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

const getAllTransactions = async () => {
    try {
        if(!ethereum) return alert('Please install Metamask');
        const transactionContract = getEthereumContract();

        const availableTransactions = await transactionContract.getAllTransactions();

        const structuredTransactions = await availableTransactions.map((transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex,) / (10 ** 18),
        }))

        return transactions.transactions = structuredTransactions.reverse();
    } catch (error) {
        console.error(error);
    }
}

const checkIfWalletIsConnected = async ()=> {
    try {
        if(!ethereum) return alert('Please install Metamask');
    
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        handleAccountsChanged(accounts);
        
        ethereum.on('accountsChanged', handleAccountsChanged);
        
    } catch (error) {
        throw new Error("No etherneum found");
    }
}

const handleAccountsChanged = accounts => {
    if (accounts.length === 0) {
        return address.currentAccount = null;
    }
    if (accounts[0] !== address.account) {
        getAllTransactions();
        return address.currentAccount = accounts[0];
    }
}

const sendTokens = () => {
    const { addressTo, amount, keyword, message } = formStructure;

    if (!address.currentAccount) return alert('Please connect to Metamask');

    if (!addressTo || !amount || !keyword || !message) return alert('Please fill all fields');
    sendTransaction();
}

const sendTransaction = async () => {
    try {
        if(!ethereum) return alert('Please install Metamask');

        // get the data from the form
        const { addressTo, amount, keyword, message } = formStructure;
        const transactionContract = getEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount.toString());

        await ethereum.request({ 
            method: 'eth_sendTransaction',
            params: [{
                from: address.currentAccount,
                to: addressTo,
                gas: '0x5208', // 21000 gwei
                value: parsedAmount._hex, 
            }]
        });

        const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        loading.transactionHash = true;
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        loading.transactionHash = false;
        console.log(`Success - ${transactionHash.hash}`);

        const transactionCount = await transactionContract.getTransactionCount();
        console.log(`Transaction Count - ${transactionCount}`);

        window.location.reload();

    } catch (error) {
        alert(error.message);
        throw new Error("No etherneum found");
    }
}

const connectWallet = async () => {
    try {
        if(!ethereum) return alert('Please install Metamask');

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

        handleAccountsChanged(accounts);

    } catch (error) {
        throw new Error("No ethereum object");
    }
}

// Datastructure
const address = reactive({
    currentAccount: null
});

const formStructure = reactive({
    addressTo: null,
    amount: null,
    keyword: null,
    message: null
});

const loading = reactive({
    transactionHash: false
});

const transactions = reactive({
    transactions: []
});

export default {
    setup(){
        const accounts = address;
        const formData = formStructure;
        provide('accounts', accounts);
        provide('formData', formData);
        provide('loading', loading);
        provide('transactions', transactions);
        provide('checkIfWalletIsConnected', checkIfWalletIsConnected)
        provide('connectWallet', connectWallet)
        provide('sendTokens', sendTokens)
    },
}
</script>
<style>
 .bg-main{
     background-color:#1e293b;
     background-image: radial-gradient(at 100% 100%, hsla(167,96%,20%,1) 0, transparent 46%);
 }
</style>