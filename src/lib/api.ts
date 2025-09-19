import axios from "axios";
import { type Token } from "../types";

const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;

if (!apiKey) {
  throw new Error("VITE_COINGECKO_API_KEY is not set in your .env.local file");
}

export const coingeckoApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    "x-cg-demo-api-key": apiKey,
  },
});

const fetchAndCombineMarketData = async (
  coinIds: string[],
  searchCoins: any[],
) => {
  if (coinIds.length === 0) {
    return [];
  }

  const marketDataResponse = await coingeckoApi.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      ids: coinIds.join(","),
      sparkline: true,
      price_change_percentage: "24h",
    },
  });
  const marketData = marketDataResponse.data;

  const combinedResults: Token[] = searchCoins.map((searchCoin: any) => {
    const correspondingMarketData = marketData.find(
      (marketCoin: any) => marketCoin.id === searchCoin.id,
    );

    return {
      id: searchCoin.id,
      name: searchCoin.name,
      symbol: searchCoin.symbol,
      thumb: searchCoin.thumb || correspondingMarketData?.image,
      price: correspondingMarketData?.current_price || 0,
      price_change_percentage_24h:
        correspondingMarketData?.price_change_percentage_24h || 0,
      sparkline_in_7d: correspondingMarketData?.sparkline_in_7d?.price || [],
      holdings: 0,
      value: 0,
    };
  });
  return combinedResults;
};

export const getTrendingTokens = async () => {
  const trendingResponse = await coingeckoApi.get("/search/trending");
  const trendingCoins = trendingResponse.data.coins.map((coin: any) => ({
    id: coin.item.id,
    name: coin.item.name,
    symbol: coin.item.symbol,
    thumb: coin.item.thumb,
  }));

  const coinIds = trendingCoins.map((coin: any) => coin.id);
  const combinedData = await fetchAndCombineMarketData(coinIds, trendingCoins);

  return { coins: combinedData };
};

export const searchTokens = async (query: string) => {
  const searchResponse = await coingeckoApi.get("/search", {
    params: { query },
  });
  const searchResults = searchResponse.data.coins;

  const coinIds = searchResults.map((coin: any) => coin.id);
  const combinedData = await fetchAndCombineMarketData(coinIds, searchResults);

  return { coins: combinedData };
};

export const refreshWatchlist = async (coinIds: string[]) => {
  const combinedData = await fetchAndCombineMarketData(coinIds, []);
  return { coins: combinedData };
};
