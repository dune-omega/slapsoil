import { useParams } from "react-router-dom";

const Coins = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default Coins;
