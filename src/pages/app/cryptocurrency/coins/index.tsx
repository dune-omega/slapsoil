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
  const { data, loading } = useFetchAPISingle(API_COIN(id as string));
  const flexStyle = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  };

  console.log(data.market_data?.current_price, currency);

  const coin1 = {
    name: data.name,
    price: data.market_data?.current_price[currency.toLowerCase()],
  };

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
              {/* <Title level={1}>{data.market_data.current_price[currency.toLowerCase()]}</Title> */}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Coins;
