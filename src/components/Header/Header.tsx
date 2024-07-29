import s from "./Header.module.scss";
import kalyLogo from "../../assets/icons/kaly-logo.svg";
import Logo from "../../assets/icons/logo_KLC.png";
import { useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { useGetKLCBalance } from "../../helpers/contractRead";
import { useAppContext } from "../../context/context";
import { ConnectionBtn } from "../ConnectionBtn/ConnectionBtn";
import { formatEther } from "viem";
import { toFixedDigits, formattAddress } from "../../helpers/mathHelpers";
import { DisconnectBtn } from "../DisconnectBtn/DisconnectBtn";

export const Header = () => {
  const { isConnected, address } = useAccount();
  const { data: walletBalance } = useBalance({ address });

  const kalyBalance = useGetKLCBalance(String(address));
  const setKalyBalance = useAppContext()?.setKalyBalance;
  const formattedWalletBalance = toFixedDigits(
    Number(walletBalance?.formatted)
  );
  const formattedAddress = formattAddress(String(address));
  const formattedKalyBalance =
    kalyBalance && typeof kalyBalance === "bigint"
      ? toFixedDigits(Number(formatEther(kalyBalance)))
      : "0";

  useEffect(() => {
    if (isConnected && setKalyBalance) {
      setKalyBalance(formattedKalyBalance);
    }
  }, [formattedKalyBalance, setKalyBalance, isConnected]);

  return (
    <header className={s.header}>
      <div className={s.header_container}>
        <a
          href="https://staking.kalychain.io/"
          target="_blank"
          rel="noreferrer"
          className={s.logo_link}
        >
          <img src={Logo} width={96} height={96} alt="Kaly Logo" className={s.logo_image} />
        </a>
        {isConnected ? (
          <div className={s.wallet_info}>
            <img className={s.kaly_logo} src={kalyLogo} alt="KLC logo" />
            {walletBalance ? formattedWalletBalance : "0.00"}{" "}
            {walletBalance?.symbol}
            <span className={s.wallet_adress}>|</span>
            <span className={s.wallet_adress}>
              {address ? formattedAddress : "unknown"}
            </span>
            <DisconnectBtn />
          </div>
        ) : (
          <div className={s.connect_btn_box}>
            <ConnectionBtn />
          </div>
        )}
      </div>
    </header>
  );
};
