import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useState } from "react";
import { useSendTransaction, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { GTA_ABI } from "../abi/gta";

const Home: NextPage = () => {
  const [value, setValue] = useState(0);
  const [transferRecipient, setTransferRecipient] = useState("");
  const { data: hash, sendTransaction } = useSendTransaction();
  const [mintRecipient, setMintRecipient] = useState("");
  const [tokenUri, setTokenUri] = useState("");
  const { data: hashWrite, writeContract } = useWriteContract();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(event.target.value));
  };

  const handleOnSubmitTransfer = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    sendTransaction({
      to: transferRecipient as `0x${string}`,
      value: parseEther(value.toString()),
    });
  };

  const handleOnSubmitMint = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    writeContract({
      address: "0xeb4Dc796747715b573710B39A28a48a319526855",
      abi: GTA_ABI,
      functionName: "safeMint",
      args: [mintRecipient as `0x${string}`, tokenUri],
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-8">
          <ConnectButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ETH Transfer Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Send ETH</h2>
            <form onSubmit={handleOnSubmitTransfer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={transferRecipient}
                  onChange={(e) => setTransferRecipient(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  value={value}
                  step={0.01}
                  onChange={handleChange}
                  placeholder="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
              >
                Send Ether
              </button>
            </form>
            {hash && (
              <p className="text-sm text-green-600 break-all">
                Transaction sent! Hash: {hash}
              </p>
            )}
          </div>

          {/* NFT Mint Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Mint NFT</h2>
            <form onSubmit={handleOnSubmitMint} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={mintRecipient}
                  onChange={(e) => setMintRecipient(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Token URI
                </label>
                <input
                  type="text"
                  value={tokenUri}
                  onChange={(e) => setTokenUri(e.target.value)}
                  placeholder="ipfs://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
              >
                Mint NFT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
