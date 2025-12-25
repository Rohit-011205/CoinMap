import { getMarketdata } from './Priceservice.js';

export const calculatePortfolioMetrics = async (holdings) => {
  if (!holdings || holdings.length === 0) {
    return {
      totalPortfolioValue: 0,
      totalInvestment: 0,
      totalPnL: 0,
      totalPnLPercent: 0,
      change24hPercent: 0,
      change24hAmount: 0,
      holdingsPnL: [],
      bestPerformer: null,
      worstPerformer: null,
    };
  }

  const symbols = holdings.map((h) => h.symbol.toUpperCase());
  const marketData = await getMarketdata(symbols);

  let totalPortfolioValue = 0;
  let totalInvestment = 0;

  const holdingsPnL = holdings.map((holding) => {
    const symbol = holding.symbol.toUpperCase();
    const marketInfo = marketData[symbol];

    const currentPrice =
      marketInfo?.currentPrice != null
        ? marketInfo.currentPrice
        : holding.currentPrice;

    const currentValue = holding.quantity * currentPrice;
    const investedValue = holding.quantity * holding.buyPrice;
    const pnl = currentValue - investedValue;
    const pnlPercent = investedValue ? (pnl / investedValue) * 100 : 0;

    totalPortfolioValue += currentValue;
    totalInvestment += investedValue;

    return {
      _id: holding._id,
      symbol: holding.symbol,
      name: holding.name,
      quantity: holding.quantity,
      buyPrice: holding.buyPrice,
      currentPrice: Number(currentPrice.toFixed(3)),
      high24h: marketInfo?.high24h || null,
      low24h: marketInfo?.low24h || null,
      priceChange24h: marketInfo?.priceChange24h || 0,
      priceChangePercentage24h: marketInfo?.priceChangePercentage24h || 0,
      currentValue: Number(currentValue.toFixed(3)),
      investedValue: Number(investedValue.toFixed(3)),
      pnl: Number(pnl.toFixed(3)),
      pnlPercent: Number(pnlPercent.toFixed(3)),
      image: marketInfo?.image || null,
    };
  });

  const totalPnL = totalPortfolioValue - totalInvestment;
  const totalPnLPercent = totalInvestment
    ? (totalPnL / totalInvestment) * 100
    : 0;

  let weightedPercent = 0;
  holdingsPnL.forEach((h) => {
    const market = marketData[h.symbol.toUpperCase()];
    const weight =
      totalPortfolioValue > 0 ? h.currentValue / totalPortfolioValue : 0;
    const changePercent = market?.priceChangePercentage24h || 0;
    weightedPercent += weight * changePercent;
  });

  const change24hPercent = weightedPercent;
  const change24hAmount = (change24hPercent / 100) * totalPortfolioValue || 0;

  const bestPerformer =
    holdingsPnL.length > 0
      ? holdingsPnL.reduce((max, h) =>
          h.pnlPercent > max.pnlPercent ? h : max
        )
      : null;

  const worstPerformer =
    holdingsPnL.length > 0
      ? holdingsPnL.reduce((min, h) =>
          h.pnlPercent < min.pnlPercent ? h : min
        )
      : null;

  return {
    totalPortfolioValue: Number(totalPortfolioValue.toFixed(3)),
    totalInvestment: Number(totalInvestment.toFixed(3)),
    totalPnL: Number(totalPnL.toFixed(3)),
    totalPnLPercent: Number(totalPnLPercent.toFixed(3)),
    change24hPercent: Number(change24hPercent.toFixed(3)),
    change24hAmount: Number(change24hAmount.toFixed(3)),
    holdingsPnL,
    bestPerformer: bestPerformer
      ? {
          _id: bestPerformer._id,
          symbol: bestPerformer.symbol,
          name: bestPerformer.name,
          pnlPercent: bestPerformer.pnlPercent,
          pnl: bestPerformer.pnl,
          currentPrice: bestPerformer.currentPrice,
        }
      : null,
    worstPerformer: worstPerformer
      ? {
          _id: worstPerformer._id,
          symbol: worstPerformer.symbol,
          name: worstPerformer.name,
          pnlPercent: worstPerformer.pnlPercent,
          pnl: worstPerformer.pnl,
          currentPrice: worstPerformer.currentPrice,
        }
      : null,
  };
};
