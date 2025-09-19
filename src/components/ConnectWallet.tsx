import Wallet from "../assets/wallet.png";
import { Button } from "./ui/button";
import {
  ConnectButton,
  useConnectModal,
  useAccountModal,
} from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export const ConnectWallet = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { isConnected, address } = useAccount();

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
      {isConnected && (
        <>
          <span className="hidden sm:inline-flex">
            <ConnectButton showBalance={false} />
          </span>

          <Button
            onClick={openAccountModal}
            icon={
              <img src={Wallet} alt="Wallet" className="w-[12.5px] h-2.5" />
            }
            className="text-[13px] font-medium rounded-full h-8 sm:hidden"
          >
            {address?.substring(0, 5)}...
          </Button>
        </>
      )}
    </>
  );
};
