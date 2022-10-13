import { API_COIN_CHART } from "constants/links";
import { useFetchAPISingle } from "hooks/useFetchAPISingle";
import React from "react";
import { useParams } from "react-router-dom";

type IResPriceChart = {
  data: {
    prices: number[][];
  };
};

const PriceChart = () => {
  const { id } = useParams();

  const { data } = useFetchAPISingle(
    API_COIN_CHART(id as string, "usd", "1")
  ) as unknown as IResPriceChart;

  console.log(data);

  console.log(data?.prices?.map((date) => date?.map((date) => new Date(date))));

  return <div>PriceChart</div>;
};

export default PriceChart;
