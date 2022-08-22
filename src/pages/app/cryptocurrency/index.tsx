import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Select, Typography } from "antd";
import { Option } from "antd/lib/mentions";
import axios from "axios";
import { API_COINS } from "constants/links";
import { CHOICE_CURRENCY } from "constants/variable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export type TableListItem = {
  market_cap_rank: string;
  name: string;
  price: number;
  image: string;
};

const Cryptocurrency = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState("$");
  const [currency, setCurrency] = useState("usd");
  const columns: ProColumns<TableListItem>[] = [
    {
      title: "#",
      dataIndex: "market_cap_rank",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (name, record) => (
        <div className="name__container">
          <img
            className="image__logo"
            src={record.image}
            alt="logo"
            width={20}
            height={20}
          />
          <Typography.Link onClick={() => navigate(`/cryptocurrency/${name}`)}>
            {name}
          </Typography.Link>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "current_price",
      render: (price) => (
        <>
          {symbol} {price}
        </>
      ),
    },
  ];

  const fetchCoins = () => {
    setLoading(true);

    axios.get(API_COINS(currency)).then((res) => {
      setCoins(res?.data || []);
      setLoading(false);
    });
  };

  const handleChange = (value: string) => {
    setCurrency(value);

    value === "usd"
      ? setSymbol("$")
      : value === "php"
      ? setSymbol("₱")
      : value === "cny"
      ? setSymbol("¥")
      : setSymbol("");
  };

  const renderHeader = () => (
    <>
      <p>Top Cryptocurrency</p>
      <Select defaultValue="USD" style={{ width: 120 }} onChange={handleChange}>
        {(CHOICE_CURRENCY || []).map((cur) => (
          <Option value={cur.value}>{cur.name}</Option>
        ))}
      </Select>
    </>
  );

  console.log(symbol);
  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency, symbol]);

  return (
    <>
      <ProTable<TableListItem>
        headerTitle={renderHeader()}
        columns={columns}
        dataSource={coins}
        loading={loading}
        rowKey="id"
        options={false}
        search={false}
        dateFormatter={false}
      />
    </>
  );
};

export default Cryptocurrency;
