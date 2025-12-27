import express from 'express';
import axios from 'axios';
import { findCoinIDs } from './Coinservice.js';

const COINGECKOAPI = "https://api.coingecko.com/api/v3";

const SYMBOL_ID_OVERRIDES = {
  BTC: "bitcoin",
  ETH: "ethereum",
};

let globalMarketCache = {};
let globalCacheTime = 0;
const GLOBAL_CACHE_DURATION = 5 * 60 * 1000;


let marketdatacache = {}
let lastmarketdatacache = 0

const timestampmarketdata = 5 * 60 * 1000;

export const getMarketdata = async (symbols) => {
  try {
    if (!symbols || symbols.length === 0) {
      return {}
    }

    const now = Date.now()

    if (globalMarketCache && Object.keys(globalMarketCache).length > 0 &&
      now - globalCacheTime < GLOBAL_CACHE_DURATION) {
      console.log(`🌍 GLOBAL CACHE HIT (age: ${Math.round((now - globalCacheTime) / 1000)}s)`);
      return globalMarketCache;
    }

    if (marketdatacache && Object.keys(marketdatacache).length > 0 && now - lastmarketdatacache < timestampmarketdata) {

      console.log(` Using cached market data (age: ${Math.round(
        (now - lastmarketdatacache) / 1000)}s)`)
      return marketdatacache
    }

    console.log('getMarketdata() called with symbols:', symbols);

    const symboltoID = await findCoinIDs(symbols);
    console.log('symboltoID mapping:', symboltoID);

    const IDs = Object.values(symboltoID)
    console.log('IDs to query:', IDs);

    if (IDs.length === 0) {
      console.warn("No Coin found ");

      return marketdatacache || {};
    }

    console.log("Fetching market data for IDs:", IDs);

    const response = await axios.get(`${COINGECKOAPI}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: IDs.join(','),
        order: 'market_cap_desc',
        per_page: 250,
        page: 1,
        sparkline: false,
        locale: 'en',
      },
    })

    const marketData = {}

    response.data.forEach((coin) => {

      const symbol = coin.symbol.toUpperCase();

      const currentPrice = coin.current_price ?? null;
      if (currentPrice === null) {
        console.warn(` No current price for ${symbol} - API returned null`);
      }

      marketData[symbol] = {
        id: coin.id,
        name: coin.name,
        symbol: symbol,
        image: coin.image,
        currentPrice: coin.current_price,
        high24h: coin.high_24h,
        low24h: coin.low_24h,
        priceChange24h: coin.price_change_24h,
        priceChangePercentage24h: coin.price_change_percentage_24h,
        marketCap: coin.market_cap,
        marketCapRank: coin.market_cap_rank,
        totalVolume: coin.total_volume,
      }
    })
    marketdatacache = marketData;
    lastmarketdatacache = now;
    globalMarketCache = marketData;
    globalCacheTime = now;
    console.log(`✅ Cached market data for ${Object.keys(marketData).length} coins`);



    return marketData


  } catch (error) {
    console.log("Error fetching market data:", error.message);

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Body:", error.response.data);
    }

    if (error.response?.status === 429) {
      console.warn("Rate limited by CoinGecko");
      // if you have cache, you can return it here
      return marketdatacache;
    }

    // For any other error, just return empty so code can use stored price
    return marketdatacache;
  }
}

export { globalMarketCache, globalCacheTime };
