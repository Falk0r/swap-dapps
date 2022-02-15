<template>
    <div class="flex w-full justify-center items-center">
        <div class="flex flex-col md:p-12 py-12 px-4">
            <h3 v-if="accounts.currentAccount" class="text-white text-3xl text-center my-2">Latest Transactions</h3>
            <h3 v-else class="text-white text-3xl text-center my-2">Connect your account to see the latest transactions</h3>
            <div v-if="accounts.currentAccount && transactions.transactions.length" class="flex flex-wrap justify-center items-center">
                <transaction-card 
                    v-for="transaction in transactions.transactions" :transaction="transaction" :key="transaction.id">
                </transaction-card>
            </div>
        </div>

    </div>
</template>

<script>
import { inject } from '@vue/runtime-core';
import TransactionCard from './TransactionCard.vue';

export default {
  components: { TransactionCard },
    setup() {
        const accounts = inject('accounts');
        const transactions = inject('transactions');
        return {
            accounts,
            transactions
        };
    },
}
</script>