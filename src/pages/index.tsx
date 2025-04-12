import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useState } from "react";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";

const Home: NextPage = () => {
  const [value, setValue] = useState(0);
  const [recipient, setRecipient] = useState("");
  const { data: hash, sendTransaction } = useSendTransaction();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(event.target.value));
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendTransaction({
      to: recipient as `0x${string}`,
      value: parseEther(value.toString()),
    });
  };
  return (
    <div>
      <ConnectButton />
      <form onSubmit={handleOnSubmit}>
        <label>Recipient:</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <label>Ether:</label>
        <input
          type="number"
          value={value}
          step={0.01}
          onChange={handleChange}
        />
        <button>Send Ether</button>
      </form>
    </div>
  );
};

export default Home;
