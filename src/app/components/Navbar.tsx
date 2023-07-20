import Image from "next/image";
import Link from "next/link";

import Logo from "../../../public/logo.png";

type AccountsProps = {
  accounts: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAccounts: any;
};

const Navbar = ({ accounts, setAccounts }: AccountsProps) => {
  const isConnected = Boolean(accounts);

  console.log(accounts);

  async function connectWallet() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  return (
    <div className="bg-tranparent sticky top-0 z-50 h-20 w-full justify-between px-4 lg:h-[12vh]">
      <div className="mx-auto hidden items-center justify-between py-1 font-light md:flex">
        <Image className="w-14" src={Logo} alt="logo"></Image>

        <div className="flex items-center gap-7">
          <ul className="flex gap-7 tracking-wider text-white">
            <Link href="#" target="_blank">
              Features
            </Link>
            <Link href="#" target="_blank">
              Whitepaper
            </Link>
            <Link href="#" target="_blank">
              About Us
            </Link>
          </ul>
        </div>
        <div className="">
          {isConnected ? (
            <p className="tracking-wider text-white">Connected</p>
          ) : (
            <button className="btn" onClick={connectWallet}>
              Connect
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center pt-4 md:hidden">
        {isConnected ? (
          <p className="tracking-wider text-white">Connected</p>
        ) : (
          <button className="btn" onClick={connectWallet}>
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
