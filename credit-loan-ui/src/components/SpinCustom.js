import { Alert, Space, Spin } from "antd";
const SpinCustom = () => {
  const content = {
    padding: "8px",
    // background: "rgba(0, 0, 0, 0.05)",
    borderRadius: "50%",
  };
  return (
    // <Space
    //   direction="vertical"
    //   style={{
    //     width: "100%",
    //   }}
    // >
    //   <Space>
    <Spin tip="" size="large" style={content}>
      {/* <div style={content} /> */}
    </Spin>
    /* </Space>

    </Space> */
  );
};
export default SpinCustom;
