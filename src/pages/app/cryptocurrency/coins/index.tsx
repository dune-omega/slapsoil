import { RightOutlined } from "@ant-design/icons";
import { Col, Row, Spin, Typography } from "antd";
import { API_COIN } from "constants/links";
import { useCryptoContext } from "context/cryptoContext";
import { useFetchAPISingle } from "hooks/useFetchAPISingle";
import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";

const { Title } = Typography;

const Coins = () => {
  const { id } = useParams();
  const { currency } = useCryptoContext();
  const { data: coin, loading } = useFetchAPISingle(API_COIN(id as string));
  const flexStyle = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  };

  console.log(coin.market_data?.current_price, currency);
  const navigate = useNavigate();
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
                <Typography.Text>{coin.name}</Typography.Text>
              </div>
              <div style={{ marginBlockStart: 10, ...flexStyle }}>
                <img
                  className="coin__image"
                  src={coin.image?.small}
                  alt="crypto_logo"
                  width={35}
                  height={35}
                />
                <Title style={{ margin: "0 0 0 10px" }}>{coin.name}</Title>
              </div>
            </Col>
            <Col span={16}>
              <Title level={5}>Price</Title>
              <Title level={1}>
                {coin.market_data.current_price["currency"]}
              </Title>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Coins;
