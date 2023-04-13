import React from "react";
import { Col, InputNumber, Row, Slider, Space } from "antd";
import { useState } from "react";
const spanStyle = {
  fontSize: "10px",
  color: "rgb(99, 115, 129)",
};
const divSpan = {
  display: "flex",
  justifyContent: "space-between",
};
const IntegerStep = (props) => {
  const [inputValue, setInputValue] = useState(0.01);
  const onChange = (newValue) => {
    setInputValue(newValue);
    props.onChange(newValue);
  };

  return (
    <Row>
      <Col span={18}>
        <Slider
          min={0.01}
          max={1}
          onChange={onChange}
          value={typeof inputValue === "number" ? inputValue : 0}
          step={0.01}
        />
        <div style={divSpan}>
          <span style={spanStyle}>0.01 tBNB</span>
          <span style={spanStyle}>1 tBNB</span>
        </div>
      </Col>
      <Col span={2}>
        <InputNumber
          min={0.01}
          max={1}
          style={{
            margin: "0 16px",
          }}
          step={0.01}
          value={inputValue}
          onChange={onChange}
          id="amount"
        />
      </Col>
    </Row>
  );
};
const DecimalStep = (props) => {
  // console.log(props);
  const [inputValue, setInputValue] = useState(3);
  const onChange = (value) => {
    if (isNaN(value)) {
      return;
    }
    setInputValue(value);
    props.onChange(value);
  };

  return (
    <Row>
      <Col span={18}>
        <Slider
          min={3}
          max={60}
          onChange={onChange}
          value={typeof inputValue === "number" ? inputValue : 0}
        />
        <div style={divSpan}>
          <span style={spanStyle}>3 мес</span>
          <span style={spanStyle}>60 мес</span>
        </div>
      </Col>

      <Col span={2}>
        <InputNumber
          min={3}
          max={60}
          style={{
            margin: "0 16px",
          }}
          // step={0.01}
          value={inputValue}
          onChange={onChange}
          id="dateMonth"
        />
      </Col>
    </Row>
  );
};

const SliderCustom = (props) => {
  const onChangeSlider = (newValue) => {
    props.onChangeParent(newValue);
  };

  const onChangeSliderDec = (newValueDec) => {
    props.onChangeParentDec(newValueDec);
  };
  return (
    <Space
      style={{
        width: "100%",
        padding: "30px",
      }}
      direction="vertical"
    >
      <IntegerStep onChange={onChangeSlider} />
      <DecimalStep onChange={onChangeSliderDec} />
    </Space>
  );
};
export default SliderCustom;
