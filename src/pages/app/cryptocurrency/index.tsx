import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Select, Typography } from "antd";
import { formatNum, percentageChange } from "constants/function";
import { TableListItem } from "constants/types";
import { CHOICE_CURRENCY } from "constants/variable";
import { useCryptoContext } from "context/cryptoContext";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const Cryptocurrency = () => {
  const navigate = useNavigate();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: "#",
      dataIndex: "market_cap_rank",
      sorter: (a, b) => +a.market_cap_rank - +b.market_cap_rank,
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
      render: (priceChange) => <>{percentageChange(priceChange as number)}</>,
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
    loading,
    page,
    perPage,
    setCurrency,
    setPage,
    setPerPage,
    setSymbol,
    symbol,
  } = useCryptoContext();

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
