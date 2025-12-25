import axios from "axios";

const COINGECKOAPI = "https://api.coingecko.com/api/v3";

const LIMIT = 99;

let topcoincache = null;
let topcoincachetime = null;

const cacheduration = 5* 60* 1000;

let isFetching = false;

export const getMarketCoins = async (req, res) => {

    try {
        const setlimit = Number(req.query.LIMIT) || LIMIT;
        const now = Date.now()

        if(topcoincache && (isFetching || (topcoincachetime && now - topcoincachetime < cacheduration))){
             console.log(`✅ Using cached top coins (age: ${Math.round((now - topcoincachetime) / 1000)}s)`);
            return res.json({
                success: true,
                data: topcoincache,
                cached: true,
            });
        }

        isFetching= true

        const response = await axios.get(`${COINGECKOAPI}/coins/markets`, {
            params: {
                vs_currency: "usd",
                order: "market_cap_desc",
                per_page: setlimit,
                page: 1,
                sparkline: false,
                price_change_percentage: "24h",
            },
         timeout: 10000
        })

        topcoincache = response.data;
        topcoincachetime = now;

        isFetching = false

        return res.json({
            success: true,
            data: response.data,
        })
    } catch (error) {
        isFetching = false
        console.error("Error fetching market coins:", error.message);

        if (topcoincache) {
            console.warn("API failed, returning cached data");
            return res.json({
                success: true,
                data: topcoincache,
                cached: true,
                message: "Using cached data (API unavailable)",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to fetch market coins",
        });
    }


}