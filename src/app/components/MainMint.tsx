import { useState } from "react";
import React from "react";

import roboPunksNFT from "../abi/abi.json";

import { ethers } from "ethers";

type MintProps = {
  accounts: string;
};

const roboPunksNFTAddress = "0x815FDb7023a73013BEeACA4d74a56D6C1a19711a";
const uri =
  "https://violet-tiny-ocelot-777.mypinata.cloud/ipfs/QmZmUTkHDZZattfy3W4izVJ5BX2sj5sBi4YzuFjNnoVR5j";

const MainMint = ({ accounts }: MintProps) => {
  const [mintAmount, setMintAmout] = useState(1);
  const isConnected = Boolean(accounts);

  console.log(accounts);

  const handleMint = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const mintNFT = new ethers.Contract(
          roboPunksNFTAddress,
          roboPunksNFT.abi,
          signer,
        );
        // console.log("provider", provider);
        // console.log("signer", signer);
        // console.log("mint", mintNFT);
        // console.log("address roboPunks", roboPunksNFTAddress);
        // console.log("minting NFT..");

        const mintTxn = await mintNFT.safeMint(accounts[0], mintAmount, uri, {
          value: BigInt("20000000000000000") * BigInt(mintAmount),
        });

        console.log("wait a moment");

        await mintTxn.wait();

        console.log("mined ", mintTxn.hash);

        console.log("nft minted!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmout(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmout(mintAmount + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center pb-[150px] pt-24 text-white">
      <div className="flex flex-col justify-center">
        <div>
          <h1 className="flex justify-center text-4xl">RoboPunks</h1>
          <p className="mx-4 flex-wrap pt-2 text-center tracking-wide">
            Its 2077. Can the robopunks NFT save humans from destructive rampant
            NFT speculation ? Mint Robopunks to find out.
          </p>
        </div>
        {isConnected ? (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center pt-10 text-white">
              <button
                className="rounded-md bg-[#D6517D] p-4"
                onClick={handleDecrement}
              >
                -
              </button>
              <input
                readOnly
                className="mx-1 h-10 w-24 pl-5 text-center text-black"
                type="number"
                value={mintAmount}
              />
              <button
                className="rounded-md bg-[#D6517D] p-4"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
            <button
              className="mt-3 cursor-pointer rounded-md bg-[#D6517D] p-4 text-white"
              onClick={handleMint}
            >
              Mint Now
            </button>
          </div>
        ) : (
          <p className="mx-4 mt-[70px] flex items-center justify-center text-center font-[25px] tracking-wider text-[#D6517D]">
            You must be connected to mint
          </p>
        )}
      </div>
    </div>
  );
};

export default MainMint;
