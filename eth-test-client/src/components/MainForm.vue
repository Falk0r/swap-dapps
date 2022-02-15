<template>
    <div class="h-full w-full flex justify-center items-center min-h-[70vh]">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous">
        <form action="" class="relative w-full md:w-1/2 xl:w-1/3 bg-slate-700 p-10 rounded-xl mx-4">
            <div class="absolute -translate-x-1/2 left-1/2 -top-12 bg-slate-700 border-2 h-16 w-16 flex justify-center items-center rounded-full">
                <i class="text-5xl fab fa-ethereum"></i>
            </div>
            <div class="flex flex-col">
                <div class="flex flex-col">
                    <input type="text" id="addressTo" class="border bg-slate-600 border-slate-600 p-2 w-full text-white rounded focus-visible:border-white focus-visible:border" v-model="formData.addressTo" placeholder="Address To" />
                </div>
                <div class="flex flex-col mt-4">
                    <input type="number" step="0.0001" id="amount" class="border bg-slate-600 border-slate-600 p-2 w-full text-white rounded" v-model="formData.amount" placeholder="Amount (ETH)" />
                </div>
                <div class="flex flex-col mt-4">
                    <input type="text" id="keyword" class="border bg-slate-600 border-slate-600 p-2 w-full text-white rounded" v-model="formData.keyword" placeholder="Keyword (GIF)" />
                </div>
                <div class="flex flex-col mt-4">
                    <input type="text" id="message" class="border bg-slate-600 border-slate-600 p-2 w-full text-white rounded" v-model="formData.message" placeholder="Enter Message"/>
                </div>
                <hr class="mt-4 ">
                <div class="flex flex-col mt-4">
                    <button v-if="!loading.transactionHash" type="submit" class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 mt-4 rounded" @click.prevent="sendTokens">Send Now</button>
                    <img v-else src="/Spinner-1s-350px.png" alt="loading" class="h-12 w-12 m-auto">
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { inject } from '@vue/runtime-core';

export default {
    setup() {
        const formData = inject('formData');
        const sendTokens = inject('sendTokens');
        const loading = inject('loading');
        return {
            formData,
            sendTokens,
            loading,
        };
    },
}
</script>