export const API_COINS = (
  currency: string = "usd",
  page: number = 1,
  per_page: number = 100
) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false`;
