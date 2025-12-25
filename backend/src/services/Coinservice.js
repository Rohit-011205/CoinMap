import express from "express";
import axios from "axios";

const COINGECKOAPI = "https://api.coingecko.com/api/v3";

// First I will create cache variables because we dont want to hit our free API rate limits
let coinlistcache = null
let cachetimestampe = null

const CACHEDURATION = 5 * 60 * 1000

const SYMBOL_ID_OVERRIDES = {
    BTC: "bitcoin",
    ETH: "ethereum",
    SOL: "solana",              // ← ADD
    MATIC: "matic-network",     // ← ADD
    BNB: "binancecoin",
};


export const getCoins = async () => {
    try {
        if (
            coinlistcache &&
            cachetimestampe &&
            Date.now() - cachetimestampe < CACHEDURATION
        ) {
            return coinlistcache;
        }


        console.log("Fetching coin list from CoinGecko API");

        const response = await axios.get(`${COINGECKOAPI}/coins/list`,
            {
                params: {
                    include_platform: false
                }
            }
        );

        coinlistcache = response.data;
        cachetimestampe = Date.now();

        console.log(` get ${coinlistcache.length} coins from Coingecko API`);
        return response.data;



    } catch (error) {
        console.error("Error fetching coin list from CoinGecko API", error);
        return []
    }
}

export const findCoinSymbol = async (symbol) => {

    try {
        const coins = await getCoins();
        const coin = coins.find(c => c.symbol.toUpperCase() === symbol.toUpperCase())

        return coin?.id || null;
    } catch (error) {
        console.log(error.message);
        return null;
    }

}

export const findCoinIDs = async (symbols) => {
    try {
        const coins = await getCoins();
        const symbolset = {}

        for (const symbol of symbols) {

            const upper = symbol.toUpperCase();


            if (SYMBOL_ID_OVERRIDES[upper]) {
                console.log(`✅ Using hard-coded ID for ${upper}: ${SYMBOL_ID_OVERRIDES[upper]}`);
                symbolset[upper] = SYMBOL_ID_OVERRIDES[upper];
                continue
            }


            const coin = coins.find(c => c.symbol.toUpperCase() === symbol.toUpperCase())

            if (coin) {
                console.log(`✅ Found ${upper}: ${coin.id}`);
                symbolset[upper] = coin.id;
            } else {
                console.warn(`⚠️ No ID found for ${upper}`);
            }
        }
        return symbolset;
    } catch (error) {
        console.log(error.message);
        return {};
    }
}

export default { getCoins, findCoinSymbol, findCoinIDs };   