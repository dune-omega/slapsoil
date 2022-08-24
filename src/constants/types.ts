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
