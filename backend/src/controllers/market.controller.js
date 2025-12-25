import axios from "axios";

const COINGECKOAPI = "https://api.coingecko.com/api/v3";

const LIMIT = 99;

export const getMarketCoins = async (req, res) => {

    try {
        const setlimit = Number(req.query.LIMIT) || LIMIT;

        const response = await axios.get(`${COINGECKOAPI}/coins/markets`, {
            params: {
                vs_currency: "usd",
                order: "market_cap_desc",
                per_page: setlimit,
                page: 1,
                sparkline: false,
                price_change_percentage: "24h",
            },

        })

        return res.json({
            success: true,
            data: response.data,
        })
    } catch (error) {
        console.error("Error fetching market coins:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch market coins",
        });
    }


}