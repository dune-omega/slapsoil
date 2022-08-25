import { useEffect, useState } from "react";
import axios from "axios";
import { ICoin } from "constants/types";

export const useFetchAPISingle = (url: string) => {
  const [data, setData] = useState({} as ICoin);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
};