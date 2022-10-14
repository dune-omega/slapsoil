import {
  ProColumns,
  ProForm,
  ProFormText,
  ProTable,
} from "@ant-design/pro-components";
import { Select, Space, Typography } from "antd";
import { formatNum, percentageChange } from "constants/function";
import { API_COINS, API_COIN_LIST } from "constants/links";
import { TableListItem } from "constants/types";
import { CHOICE_CURRENCY } from "constants/variable";
import { useCryptoContext } from "context/cryptoContext";
import { useFetchAPIMultiple } from "hooks/useFetchAPIMulti";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const Cryptocurrency = () => {
  const navigate = useNavigate();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: "#",
      dataIndex: "market_cap_rank",
      render: (_, record) => record.market_cap_rank,
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
      title: "%",
      dataIndex: "price_change_percentage_24h",
      render: (_, record) =>
        percentageChange(record.price_change_percentage_24h as number),
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

  const {
    coins,
    currency,
    loading,
    page,
    perPage,
    setCurrency,
    setPage,
    setPerPage,
    setSymbol,
    symbol,
  } = useCryptoContext();

  const { data } = useFetchAPIMultiple([
    API_COINS(currency, page, perPage),
    API_COIN_LIST(),
  ]);

  const renderHeader = () => (
    <>
      <Space align="center">
        <ProForm>
          <ProFormText
            name="Cyptocurrency"
            label="Search for a coin:"
            placeholder="eg: Bitcoin"
          />
        </ProForm>
        <Select
          defaultValue="USD"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          {(CHOICE_CURRENCY || []).map((cur) => (
            <Select.Option key={cur.value} value={cur.value}>
              {cur.name}
            </Select.Option>
          ))}
        </Select>
      </Space>
    </>
  );

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
        scroll={{
          x: 992,
        }}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 10,
          pageSize: perPage,
          total: data[1]?.length,
          onChange: (page, perPage) => {
            setPage(page);
            setPerPage(perPage);
          },
        }}
      />
    </>
  );
};

export default Cryptocurrency;
