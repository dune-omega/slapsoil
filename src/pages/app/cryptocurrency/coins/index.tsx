import { RightOutlined } from "@ant-design/icons";
import { Col, Row, Space, Spin, Typography } from "antd";
import { API_COIN } from "constants/links";
import { useCryptoContext } from "context/cryptoContext";
import { useFetchAPISingle } from "hooks/useFetchAPISingle";
import numeral from "numeral";
import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";

export interface ICoin {
  name: string;
  price: number | string;
  price_change: string;
}

const { Title } = Typography;

const Coins = () => {
  const { id } = useParams();
  const { currency, symbol } = useCryptoContext();
  const { data, loading } = useFetchAPISingle(API_COIN(id as string));
  const flexStyle = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  };

  const coin: ICoin = {
    name: data.name,
    price: numeral(
      data?.market_data?.current_price[currency.toLowerCase()]
    ).format("0,00.00"),
    price_change: data?.market_data?.price_change_percentage_24h?.toFixed(2),
  };

  const navigate = useNavigate();

  const colorChangeStyle = {
    backgroundColor: +coin.price_change > 0.01 ? "#16c784" : "#ea3943",
    color: "white",
    padding: "0.3rem 1rem",
    borderRadius: "5px",
  };

  console.log(data);
  console.log(coin);
  return (
    <>
      {loading ? (
        <Row justify="center">
          <Col>
            <Spin size="default" />
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col span={8}>
              <div style={{ ...flexStyle }}>
                <Typography.Link onClick={() => navigate("/cryptocurrency")}>
                  Cryptocurrency
                </Typography.Link>
                <RightOutlined style={{ fontSize: 12 }} />
                <Typography.Text>{data.name}</Typography.Text>
              </div>
              <div style={{ marginBlockStart: 10, ...flexStyle }}>
                <img
                  className="coin__image"
                  src={data.image?.small}
                  alt="crypto_logo"
                  width={35}
                  height={35}
                />
                <Title style={{ margin: "0 0 0 10px" }}>{data.name}</Title>
              </div>
            </Col>
            <Col span={16}>
              <Title level={5}>Price</Title>
              <Space direction="horizontal" align="center">
                <Title level={1} style={{ margin: 0 }}>
                  {symbol}
                  {coin.price}
                </Title>
                <span style={{ ...colorChangeStyle }}>{coin.price_change}</span>
              </Space>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Coins;
