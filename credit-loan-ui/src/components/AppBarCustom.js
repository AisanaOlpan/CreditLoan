import React from "react";

import { Layout, theme } from "antd";
import { Input, Button } from "antd";
const { Search } = Input;
import MetamaskIcon from "./Icons/MetamaskIcon";

const { Header } = Layout;

const App = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  console.log(props.signerRef);
  const onSearch = (value) => console.log(value);

  const header = {
    position: "sticky",
    top: 0,
    zIndex: 1,
    width: "100%",
    padding: 0,
    background: "none",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "space-between",
  };

  const search_custom = {
    fontSize: "20px",
    color: "rgb(99, 115, 129)",
    "&:hover": {
      backgroundColor: "#fff",
      borderRadius: "50%",
      transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
  };

  const menu = {
    display: "flex",
    margin: "0 50px",
  };

  const menu_item = {
    padding: "10px",
    color: "rgb(99, 115, 129)",
  };

  return (
    <>
      <Header style={header}>
        <div>
          {/* <button style={search_custom}>
          <SearchOutlined />
        </button> */}
        </div>

        <div style={menu}>
          <div style={menu_item}>
            <h3>{props.signerRef}</h3>
          </div>
          <div style={menu_item}>
            <button onClick={props.onClickMetaMask}>
              <MetamaskIcon />
            </button>
          </div>
        </div>
      </Header>
    </>
  );
};
export default App;
