import { ProLayout } from "@ant-design/pro-components";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_COIN_LIST } from "./config/http";

const Root = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    await axios.get(API_COIN_LIST()).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  return (
    <>
      <ProLayout />
    </>
  );
};

export default Root;
