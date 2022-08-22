import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Select, Typography } from "antd";
import { Option } from "antd/lib/mentions";
import axios from "axios";
import { API_COINS } from "constants/variables";
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

  const fetchCoins = () => {
    setLoading(true);

    axios.get(API_COINS()).then((res) => {
      setCoins(res?.data || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  console.log(coins);

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
    },
  ];

  return (
    <>
      <ProTable<TableListItem>
        headerTitle={
          <>
            <p>Top Cryptocurrency</p>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              // onChange={handleChange}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </>
        }
        columns={columns}
        dataSource={coins}
        loading={loading}
        rowKey="id"
        options={false}
        pagination={false}
        search={false}
        dateFormatter={false}
      />
    </>
  );
};

export default Cryptocurrency;
