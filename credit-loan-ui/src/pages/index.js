import React, { useEffect, useState, useRef } from "react";
import Web3Modal from "web3modal";
import { Contract, providers, ethers } from "ethers";
import { Inter } from "next/font/google";
import AppBarCustom from "@/components/AppBarCustom";
import { Layout, message } from "antd";
import SiderCustom from "@/components/SiderCustom";
import { CONTRACT_ADDRESS, abi } from "../constants/index";
import CardCustom from "@/components/CardCustom";

// import classes from "../components/AppBar.module.css";

const { Content, Footer } = Layout;

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [signerRef, setSignerRef] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new ethers.providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();

    if (chainId !== 97) {
      window.alert("Change network");
      //TODO metmask переключился на 97
    }

    if (needSigner) {
      const signer = web3Provider.getSigner(); //текущий кошелек юзера который вызывает
      const address = await signer.getAddress();
      console.log("getProviderOrSigner" + address);

      console.log(address);

      setSignerRef(address);
      return signer;
    }
    return web3Provider;
  };

  const getOwnerSigner = async () => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(PRIVATE_KEY, web3Provider);
    const { chainId } = await web3Provider.getNetwork();

    if (chainId !== 97) {
      window.alert("Change network");
      //TODO metmask переключился на 97
    }

    const signerOwner = wallet.connect(web3Provider);
    // console.log(signerOwner);
    return signerOwner;
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner(true);

      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: 97,
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet();
      console.log(signerRef);
    }
  }, [walletConnected]);

  const createCreditContract = async () => {
    setIsLoading(true);
    try {
      const signerOwner = await getOwnerSigner();
      console.log(signerOwner);
      let amountLoan = document.getElementById("amount").value;
      let loanDuration = document.getElementById("dateMonth").value;
      let interestRate = 13;
      let collateralAmount = (
        Number(document.getElementById("amount").value) / 2
      ).toString();

      const creditContract = new Contract(CONTRACT_ADDRESS, abi, signerOwner);

      const valueWei = ethers.utils.parseUnits(amountLoan);
      const options = { value: valueWei, gasLimit: 200000 };
      console.log("defineConditionContract");

      const SignedContract = await creditContract.defineConditionContract(
        signerRef,
        ethers.utils.parseUnits(amountLoan),
        interestRate,
        loanDuration,
        ethers.utils.parseUnits(collateralAmount),
        options
      );
      console.log("SignedContract.wait(1)");
      const txReceipt = await SignedContract.wait(1);
      console.log(txReceipt);
      const statusCredit = await creditContract.creditworthinessCheck();
      console.log(statusCredit);
      if (statusCredit == true) {
        const disburseLoan = await creditContract.disburseLoan();
        const txReceiptDisburse = await disburseLoan.wait(1);
        success();
      }
    } catch (error) {
      errorMessage("Error");
      console.error(error);
    }

    setIsLoading(false);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Credit issued to your account received money!",
      duration: 10,
    });
  };

  const errorMessage = (msgErr) => {
    messageApi.open({
      type: "error",
      content: msgErr,
      duration: 10,
    });
  };
  return (
    <>
      <Layout hasSider>
        {/* <SiderCustom /> */}

        <Layout className="site-layout">
          <AppBarCustom signerRef={signerRef} onClickMetaMask={connectWallet} />
          <Content
            style={{
              overflow: "initial",
            }}
          >
            <div
              style={{
                textAlign: "center",
                paddingTop: "88px",
                minHeight: "100%",
              }}
            >
              {contextHolder}
              <CardCustom
                createCreditContract={createCreditContract}
                load={isLoading}
              />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          ></Footer>
        </Layout>
      </Layout>
    </>
  );
}
