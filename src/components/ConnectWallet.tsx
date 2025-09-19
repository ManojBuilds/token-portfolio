import Wallet from "../assets/wallet.png";
import { Button } from "./ui/button";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export const ConnectWallet = () => {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  return (
    <>
      {!isConnected && openConnectModal && (
        <Button
          onClick={openConnectModal}
          icon={<img src={Wallet} alt="Wallet" className="w-[12.5px] h-2.5" />}
          className="text-[13px] font-medium rounded-full h-8"
        >
          Connect Wallet
        </Button>
      )}
      {isConnected && <ConnectButton />}
    </>
  );
};
