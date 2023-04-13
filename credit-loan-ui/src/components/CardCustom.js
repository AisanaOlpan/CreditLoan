import React from "react";
import { Button, Card, Col, Row } from "antd";
import EthersIcon from "./Icons/EthersIcon";
import SliderCustom from "./SliderCustom";
import SpinCustom from "../components/SpinCustom";
import { useState, useEffect } from "react";
import { Typography } from "antd";
const { Title } = Typography;

const divIcon = {
  margin: "20px auto",
  display: "flex",
  borderRadius: "50%",
  width: "64px",
  height: "64px",
  justifyContent: "center",
  color: "rgb(12, 83, 183)",
  backgroundImage:
    "linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)",
};

const divEther = {
  backgroundColor: "rgb(209, 233, 252)",
  borderRadius: "20px",
};

const divCard = {
  borderRadius: "20px",
};
const divIconElem = {
  margin: "10px auto",
};

const content = {
  height: "75px",
  verticalAlign: "middle",
  fontSize: "40px",
};

const btnHoverStyle = {
  backgroundColor: "rgb(46, 86, 149)",
  color: "#fff",
  padding: "10px",
  fontSize: "20px",
  borderRadius: "12px",
  width: "60%",
};

const innerCard = {
  margin: "20px",
};

const CardCustom = (props) => {
  let currency = "tBNB";
  let interestRate = 13;
  const [inputValueAmount, setInputValue] = useState(0.01);
  const [inputDateMonth, setinputDateMonth] = useState(3);
  const onChangeUpdate = (newValue) => {
    setInputValue(newValue);
    console.log(newValue);
  };

  const onChangeUpdateDec = (newValue) => {
    setinputDateMonth(newValue);
    console.log(newValue);
  };
  let amountInMonth =
    (
      ((inputValueAmount * interestRate) / 100 + inputValueAmount) /
      inputDateMonth
    )
      .toFixed(3)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") +
    " " +
    currency;

  let dutyAmount =
    ((inputValueAmount * interestRate) / 100)
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") +
    " " +
    currency;

  let totalAmount =
    ((inputValueAmount * interestRate) / 100 + inputValueAmount)
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") +
    " " +
    currency;

  let collateralAmount = inputValueAmount / 2;

  const [btnStyle, setBtnStyle] = useState({
    backgroundColor: "rgb(32, 101, 209)",
    color: "#fff",
    padding: "10px",
    fontSize: "20px",
    borderRadius: "12px",
    width: "60%",
  });

  function handleMouseEnter() {
    setBtnStyle({
      ...btnStyle,
      backgroundColor: "rgb(46, 86, 149)",
    });
  }

  function handleMouseLeave() {
    setBtnStyle({
      ...btnStyle,
      backgroundColor: "rgb(32, 101, 209)",
    });
  }

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Row
        gutter={16}
        style={{ marginBottom: 16, justifyContent: "space-between" }}
      >
        <Col span={14}>
          <Card title={"Калькулятор кредита"} bordered={false} style={divCard}>
            <SliderCustom
              onChangeParent={onChangeUpdate}
              onChangeParentDec={onChangeUpdateDec}
            />
          </Card>
        </Col>
        <Col span={10}>
          <Card title=" Условие кредитования " bordered={false} style={divCard}>
            <div style={innerCard}>
              <div style={{ display: "flex" }}>
                <h3>Годовая ставка: </h3>
                <div style={{ width: "1em" }}></div>
                <h4>{interestRate}%</h4>
              </div>
              <div style={{ display: "flex" }}>
                <h3>Cумма займа: </h3>
                <div style={{ width: "1em" }}></div>
                <h4>
                  {inputValueAmount
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") +
                    " " +
                    currency}
                </h4>
              </div>
              <div style={{ display: "flex" }}>
                <h3>Залог: </h3>
                <div style={{ width: "1em" }}></div>
                <h4>
                  {collateralAmount
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") +
                    " " +
                    currency}
                </h4>
              </div>
              <div style={{ display: "flex" }}>
                <h3>Ежемесячный платеж:</h3>
                <div style={{ width: "1em" }}></div>
                <h4>{amountInMonth}</h4>
              </div>
              <div style={{ display: "flex" }}>
                <h3>Переплата:</h3>
                <div style={{ width: "1em" }}></div>
                <h4>{dutyAmount}</h4>
              </div>
              <div style={{ display: "flex" }}>
                <h3>Общая сумма займа:</h3>
                <div style={{ width: "1em" }}></div>
                <h4>{totalAmount}</h4>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <div style={divIcon}>
            <div style={divIconElem}>
              {props.load == true ? <SpinCustom /> : <EthersIcon />}
            </div>
          </div>
        }
        style={divEther}
      >
        <Title level={3}>Кредитный договор</Title>
        <div style={innerCard}>
          <div style={{ fontSize: "12px" }}>
            <h3>Ежемесячный платеж</h3>
          </div>
          <div style={content}>
            <h6>{amountInMonth}</h6>
          </div>
          <div>
            <button
              style={btnStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={props.createCreditContract}
            >
              Получить кредит
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default CardCustom;
