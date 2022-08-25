export interface ICoin {
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
  symbol: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  setSymbol: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  page: number;
  perPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
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
