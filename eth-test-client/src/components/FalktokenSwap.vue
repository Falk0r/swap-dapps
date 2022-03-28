<template>
  <form action="" class="relative w-full md:w-1/2 xl:w-1/3 bg-slate-700 p-10 rounded-xl mx-4">
        <div class="absolute -translate-x-1/2 left-1/2 -top-12 bg-slate-700 border-2 h-16 w-16 flex justify-center items-center rounded-full">
            <i class="text-4xl fas fa-coins"></i>
        </div>
        <div class="flex flex-col">
            <div class="flex justify-between items-center mb-4">
                <div @click="buyFalktokens" id="buy" class="border-2 bg-slate-600 border-slate-500 p-2 text-white rounded cursor-pointer">
                    BUY
                </div>
                <div>
                    &lt; - - - - >
                </div>
                <div @click="sellFalktokens" id="sell" class="border-2 bg-slate-600 border-slate-600 p-2 text-white rounded cursor-pointer">
                    SELL
                </div>
            </div>
            <div v-if="state.buy">
                <div class="flex flex-col">
                    <div class="flex justify-between">
                        <label for="addressTo">Input</label>
                        <p class=" text-sm">Balance : {{tokens.balanceETH}} ETH</p>
                    </div>
                    <div class="flex">
                    <input v-model="tokens.amountETH" type="number" step="0.0001" id="amountETH" class="border bg-slate-500 border-slate-600 p-2 w-full text-white rounded-l"  placeholder="Amount (ETH)" />
                    <div class="border bg-slate-600 border-slate-600 p-2 text-white rounded-r w-14">ETH</div>
                    </div>
                </div>
                <div class="flex flex-col mt-4">
                    <div class="flex justify-between">
                        <label for="amount">Output</label>
                        <p class=" text-sm">Balance : {{tokens.balanceFLK}} FLK</p>
                    </div>
                    <div class="flex">
                    <input v-if="!tokens.amountETH" disabled type="number" class="border bg-slate-500 border-slate-600 p-2 w-full text-white rounded-l"  placeholder="Amount (FLK)"/>
                    <input v-if="tokens.amountETH" disabled type="number" class="border bg-slate-500 border-slate-600 p-2 w-full text-white rounded-l" :value="(tokens.amountETH * 100).toFixed(2)" />
                    <div class="border bg-slate-600 border-slate-600 p-2 text-white rounded-r w-14">FLK</div>
                    </div>
                </div>
            </div>
            <div v-if="state.sell">
                <div class="flex flex-col">
                    <div class="flex justify-between">
                        <label for="addressTo">Input</label>
                        <p class=" text-sm">Balance : {{tokens.balanceFLK}} FLK</p>
                    </div>
                    <div class="flex">
                    <input v-model="tokens.amountFLK" type="number" step="0.01" id="amountFLK" class="border bg-slate-500 border-slate-600 p-2 w-full text-white rounded-l"  placeholder="Amount (FLK)" />
                    <div class="border bg-slate-600 border-slate-600 p-2 text-white rounded-r w-14">FLK</div>
                    </div>
                </div>
                <div class="flex flex-col mt-4">
                    <div class="flex justify-between">
                        <label for="amount">Output</label>
                        <p class=" text-sm">Balance : {{tokens.balanceETH}} ETH</p>
                    </div>
                    <div class="flex">
                    <input v-if="!tokens.amountFLK" disabled type="number" class="border bg-slate-500 border-slate-600 p-2 w-full text-white rounded-l"  placeholder="Amount (ETH)"  />
                    <input v-if="tokens.amountFLK" disabled type="number" class="border bg-slate-500 border-slate-600 p-2 w-full text-white rounded-l"  :value="(tokens.amountFLK / 100).toFixed(4)"  />
                    <div class="border bg-slate-600 border-slate-600 p-2 text-white rounded-r w-14">ETH</div>
                    </div>
                </div>
            </div>
            <div class="flex justify-between mt-4">
                <p>Exchange Rates :</p>
                <p>1 ETH = 100 FLK</p>
            </div>
            <hr class="mt-4 ">
            <div class="flex flex-col mt-4">
                <button v-if="!loading.transactionSwap" type="submit" class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 mt-4 rounded" @click.prevent="exchange">Exchange Now</button>
                <img v-else src="/Spinner-1s-350px.png" alt="loading" class="h-12 w-12 m-auto">
            </div>
        </div>
    </form>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { onMounted, inject } from "@vue/runtime-core";

const getSwapContracts = inject('getSwapContracts');
const makeSwapEth = inject('makeSwapEth');
const makeSwapFLK = inject('makeSwapFLK');
const tokens = inject('tokens');
const loading = inject('loading');

const state = reactive({
    buy: true,
    sell: false,
});

let buy, sell;

onMounted(() => {
    buy = document.getElementById("buy");
    sell = document.getElementById("sell");
    getSwapContracts();
});

const buyFalktokens = () => {
    state.buy = true;
    state.sell = false;
    tokens.amountETH = null;
    tokens.amountFLK = null;
    buy.classList.add('border-slate-500');
    buy.classList.remove('border-slate-600');
    sell.classList.add('border-slate-600');
    sell.classList.remove('border-slate-500');
}

const sellFalktokens = () => {
    state.buy = false;
    state.sell = true;
    tokens.amountETH = null;
    tokens.amountFLK = null;
    sell.classList.add('border-slate-500');
    sell.classList.remove('border-slate-600');
    buy.classList.add('border-slate-600');
    buy.classList.remove('border-slate-500');
}

const exchange = async() => {
    if(tokens.amountETH){
        await makeSwapEth(tokens.amountETH);
        return;
    }
    if (tokens.amountFLK) {
        await makeSwapFLK(tokens.amountFLK);
        return;
    }
}

</script>