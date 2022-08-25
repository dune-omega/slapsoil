import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import numeral from "numeral";

export const percentageChange = (num: number) => (
  <span style={{ color: num > 1 ? "green" : "red" }}>
    {num > 1 ? (
      <CaretUpOutlined />
    ) : num < 1 ? (
      <CaretDownOutlined />
    ) : num === 0 ? (
      ""
    ) : (
      ""
    )}{" "}
    {num.toFixed(2).toString().replace("-", "")}
  </span>
);

export const formatNum = (num: number) =>
  num > 1 ? numeral(num).format("0,0.00") : num;
