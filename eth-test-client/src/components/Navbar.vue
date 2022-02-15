<template>
<!-- navbar -->
<nav class="h-min w-full bg-transparent">
    <div class="flex flex-wrap items-center px-4 py-3">
        <button v-if="!accounts.currentAccount" @click="connectWallet" class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full mb-4">
            Connect Metamask
        </button>
        <button v-if="accounts.currentAccount"  class="flex items-center bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full mb-4">
            <img src="/metamask-white.png" alt="metamask-logo" class="mr-2 h-4 w-4">
            {{ shortenAddress(accounts.currentAccount)}}
        </button>
    </div>
</nav>
</template>

<script>
import { inject } from 'vue'
import { shortenAddress } from '../utils/shortenAddress'

export default {
    setup() {
        const checkIfWalletIsConnected = inject('checkIfWalletIsConnected');
        const connectWallet = inject('connectWallet');
        const accounts = inject('accounts');
        const transactions = inject('transactions');
        return {
            checkIfWalletIsConnected,
            connectWallet,
            accounts,
            transactions
        }
    },
    mounted() {
        this.checkIfWalletIsConnected();
    },
    methods: {
        shortenAddress(address) {
            return shortenAddress(address);
        },
    }
}
</script>