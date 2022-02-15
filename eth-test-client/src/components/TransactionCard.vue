<template>
    <div class="bg-slate-700 m-4 flex flex-1 
        2xl:min-w-[450px]
        2xl:max-w-[500px]
        sm:min-w-[270px]
        sm:max-w-[300px]
        flex-col p-3 rounded-md hover:shadow-2xl
    ">
        <div class="flex flex-col items-center w-full mt-3">
            <div class="w-full mb-6 p-2">
                <a :href="`https://ropsten.etherscan.io/address/${transaction.addressFrom}`" target="_blank" rel="noopener noreferrer">
                    <p class="text-white text-base">From: {{shortenAddress(transaction.addressFrom)}} </p>
                </a>
                <a :href="`https://ropsten.etherscan.io/address/${transaction.addressTo}`" target="_blank" rel="noopener noreferrer">
                    <p class="text-white text-base">To: {{shortenAddress(transaction.addressTo)}} </p>
                </a>
                <p class="text-white text-base">Amount: {{transaction.amount}} ETH</p>
                <div v-if="transaction.message">
                    <p class="text-white text-base">Message: {{transaction.message}}</p>
                </div>
            </div>
                <img :src="gif || transaction.url" alt="gif" class="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover">
                <div class="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                    <p class="text-cyan-500 font-bold"> {{transaction.timestamp}} </p>
                </div>
        </div>

    </div>
</template>

<script>
import { shortenAddress } from '../utils/shortenAddress'
const API_KEY = import.meta.env.VITE_GIPHY_API;
export default {
    props: {
        transaction: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            gif : '',
        };
    },
    mounted() {
        if (this.transaction.keyword) {
            this.getGif();
        }
    },
    methods: {
        shortenAddress(address) {
            return shortenAddress(address);
        },
        async getGif(){
            try {
                const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${this.transaction.keyword.split(" ").join("")}&limit=1`);
                const data = await response.json();

                return this.gif = data.data[0]?.images?.downsized_medium?.url;
            } catch (error) {
                this.gif = 'https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284';
            }
        }

    },
}
</script>