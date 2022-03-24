<template>
  <div class="flex">
      <p @click="selectSendEth" id="sendEth" class="mr-3 cursor-pointer underline-offset-4 underline hover:underline">Send Etherneum</p>
      <p @click="selectEthSwap" id="ethSwap" class="ml-3 cursor-pointer underline-offset-4 hover:underline">FalkToken Exchange</p>
  </div>
</template>

<script setup>
import {inject, watch} from 'vue'

const {sendEth, selectSendEth} = inject('sendEth')
const {ethSwap, selectEthSwap} = inject('ethSwap')

watch(sendEth, (newVal) => {
    if (newVal) {
        document.getElementById('sendEth').classList.add('underline')
    } else {
        document.getElementById('sendEth').classList.remove('underline')
    }
})

watch(ethSwap, (newVal) => {
    if (newVal) {
        document.getElementById('ethSwap').classList.add('underline')
    } else {
        document.getElementById('ethSwap').classList.remove('underline')
    }
})

</script>