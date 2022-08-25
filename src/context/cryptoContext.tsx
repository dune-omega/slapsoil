import axios from "axios";
import { API_COINS } from "constants/links";
import { ICryptoContext, ICryptolist } from "constants/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export const CryptoContext = createContext({} as ICryptoContext);

type Context = {
  children: ReactNode;
};

export const ICryptoProvider = ({ children }: Context) => {
  const [coins, setCoins] = useState([] as ICryptolist[]);
  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState("$");
  const [currency, setCurrency] = useState("usd");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    const fetchCoins = () => {
      setLoading(true);

      axios.get(API_COINS(currency, page, perPage)).then((res) => {
        setCoins(res?.data || []);
        setLoading(false);
      });
    };

    fetchCoins();
  }, [currency, page, perPage]);

  return (
    <CryptoContext.Provider
      value={{
        coins,
        loading,
        page,
        perPage,
        setCurrency,
        setPage,
        setPerPage,
        setSymbol,
        symbol,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export const useCryptoContext = () => useContext(CryptoContext);
