<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import MainForm from './components/MainForm.vue'
import Navbar from './components/Navbar.vue'
import TransactionContext from './contexts/TransactionContext.vue'
import Transactions from './components/Transactions.vue'
import MyLink from './components/MyLink.vue'
</script>

<template>
    <transaction-context>
        <navbar />
        <main-form />
        <transactions />
        <my-link />
    </transaction-context>
</template>