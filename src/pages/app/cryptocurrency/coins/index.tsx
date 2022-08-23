import { useParams } from "react-router-dom";

const Coins = () => {
  const { id } = useParams();

  console.log(id);
  return <div>{id}</div>;
};

export default Coins;
