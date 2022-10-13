export type ICoinPrice = {
  usd: "usd";
  php: "php";
  cny: "cny";
};

export interface ICoinData {
  categories: string[];
  description: { en: string };
  hashing_algorithm: string;
  id: string;
  image: {
    large: string;
    small: string;
    thumb: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
  };
  market_cap_rank: number;
  market_data: {
    current_price: string;
    price_change_percentage_24h: number;
  };
  name: string;
  symbol: string;
}

export interface ICryptolist {
  circulating_supply: number;
  current_price: number;
  id: string;
  image: string;
  market_cap_rank: number;
  market_cap: number;
  max_supply: number;
  name: string;
  price_change_percentage_24h: number;
  symbol: string;
  total_supply: number;
  total_volume: number;
}

export interface ICryptoContext {
  coins: ICryptolist[];
  currency: string;
  loading: boolean;
  page: number;
  perPage: number;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  setSymbol: React.Dispatch<React.SetStateAction<string>>;
  symbol: string;
}

export type TableListItem = {
  circulating_supply: number;
  current_price: number;
  id: string;
  image: string;
  market_cap_rank: string | number;
  name: string;
  price_change_percentage_24h: number;
};
