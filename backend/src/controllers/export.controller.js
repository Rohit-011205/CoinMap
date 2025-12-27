import ExcelJS from "exceljs";
import Holding from "../models/holding.model.js";

export const exportexcel = async (req, res) => {
  try {
    const userId = req.UserID;

    const holdings = await Holding.find({ UserID:userId }).lean();

    // ✅ Correct empty check
    if (holdings.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No holdings to export",
      });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Portfolio");

    worksheet.columns = [
      { header: "Coin", key: "coinName", width: 20 },
      { header: "Symbol", key: "symbol", width: 10 },
      { header: "Quantity", key: "quantity", width: 12 },
      { header: "Entry Price ($)", key: "entryPrice", width: 15 },
      { header: "Current Price ($)", key: "currentPrice", width: 15 },
      { header: "Total Cost ($)", key: "totalCost", width: 15 },
      { header: "Current Value ($)", key: "currentValue", width: 15 },
      { header: "P&L ($)", key: "profitLoss", width: 12 },
      { header: "P&L %", key: "profitLossPercent", width: 10 },
      { header: "Date Added", key: "dateAdded", width: 15 },
    ];

    holdings.forEach((h) => {
      // ✅ Normalize numbers
      const quantity = Number(h.quantity) || 0;
      const entryPrice = Number(h.entryPrice) || 0;
      const currentPrice = Number(h.currentPrice) || 0;

      const totalCost = quantity * entryPrice;
      const currentValue = quantity * currentPrice;
      const profitLoss = currentValue - totalCost;

      const profitLossPercent =
        totalCost > 0 ? ((profitLoss / totalCost) * 100).toFixed(2) : "0.00";

      worksheet.addRow({
        coinName: h.coinName || "N/A",
        symbol: h.symbol?.toUpperCase() || "N/A",
        quantity: quantity.toFixed(6),
        entryPrice: entryPrice.toFixed(2),
        currentPrice: currentPrice.toFixed(2),
        totalCost: totalCost.toFixed(2),
        currentValue: currentValue.toFixed(2),
        profitLoss: profitLoss.toFixed(2),
        profitLossPercent: `${profitLossPercent}%`,
        dateAdded: h.createdAt
          ? new Date(h.createdAt).toLocaleDateString()
          : "N/A",
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=portfolio-${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Excel export error:", error);
    res.status(500).json({
      success: false,
      message: "Export failed",
    });
  }
};
