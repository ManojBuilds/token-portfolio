import Logo from "../assets/logo.png";
import { ConnectWallet } from "./ConnectWallet";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
export const Header = () => {
  return (
    <MaxWidthWrapper>
      <header className="p-4 sm:p-3 w-full h-full">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Logo"
              className="w-[28px] h-[28px] aspect-square object-contain"
            />
            <h1 className="text-xl font-semibold text-white">
              Token Portfolio
            </h1>
          </div>
          <ConnectWallet />
        </div>
      </header>
    </MaxWidthWrapper>
  );
};
