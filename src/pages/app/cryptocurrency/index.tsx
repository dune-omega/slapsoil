import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Pagination, PaginationProps, Select, Typography } from "antd";
import { Option } from "antd/lib/mentions";
import axios from "axios";
import { API_COINS } from "constants/links";
import { CHOICE_CURRENCY } from "constants/variable";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export type TableListItem = {
  market_cap_rank: string;
  name: string;
  price: number;
  image: string;
  id: string;
  circulating_supply: number;
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
          <Typography.Link
            onClick={() => navigate(`/cryptocurrency/${record.id}`)}
          >
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
          {symbol} {formatNum(price as number)}
        </>
      ),
    },
    {
      title: "Circulating Supply",
      dataIndex: "circulating_supply",
      render: (csupply) => <>{formatNum(csupply as number)}</>,
    },
    {
      title: "Max Supply",
      dataIndex: "max_supply",
      render: (msupply) => (
        <>{msupply === "-" ? "N/A" : formatNum(msupply as number)}</>
      ),
    },
    {
      title: "Market Cap",
      dataIndex: "market_cap",
      render: (mcap) => (
        <>
          {symbol} {formatNum(mcap as number)}
        </>
      ),
    },
    {
      title: "Total Volume",
      dataIndex: "total_volume",
      render: (volume) => (
        <>
          {symbol} {formatNum(volume as number)}
        </>
      ),
    },
  ];
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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
          <Select.Option key={cur.value} value={cur.value}>
            {cur.name}
          </Select.Option>
        ))}
      </Select>
    </>
  );

  const formatNum = (num: number) =>
    num > 1 ? numeral(num).format("0,0.00") : num;

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

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

  console.log(coins);

  const style = {
    // display: "none",
  };
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
        pagination={{
          showSizeChanger: true,
          pageSize: perPage,
          onShowSizeChange: (current: number, size: number) => {
            console.log(current);
            setPerPage(size);
          },
          style: { ...style },
          // itemRender: (page, type, element) => {
          //   return (
          //     <Pagination
          //       defaultCurrent={1}
          //       total={10000}
          //       onChange={onChange}
          //     />
          //   );
          // },
        }}
      />
      <button onClick={() => setPage(page - 1)}>prev</button>
      <button onClick={() => setPage(page + 1)}>next</button>
    </>
  );
};

export default Cryptocurrency;
