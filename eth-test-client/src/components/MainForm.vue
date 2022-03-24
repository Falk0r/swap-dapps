<template>
    <div class="h-full w-full flex justify-center items-center min-h-[70vh]">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous">
        <send-eth v-show="sendEth" />
        <falktoken-swap v-show="ethSwap" />
    </div>
</template>

<script setup>
import {inject} from 'vue'
import FalktokenSwap from './FalktokenSwap.vue'
import SendEth from './SendEth.vue'

const {sendEth} = inject('sendEth')
const {ethSwap} = inject('ethSwap')

</script>