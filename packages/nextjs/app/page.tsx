"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address, InputBase } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const [buyValue, setBuyValue] = useState("");
  const [sellValue, setSellValue] = useState("");
  const [activeTab, setActiveTab] = useState("Sell");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastValue, setLastValue] = useState<number | null>(null);
  const { address: connectedAddress } = useAccount();

  const fetchLastValue = useCallback(async () => {
    try {
      const response = await fetch("https://api.ripiotrade.co/v3/public/ARSUSDC/ticker");
      const data = await response.json();
      setLastValue(data.data.last);
    } catch (error) {
      console.error("Error fetching last value:", error);
    }
  }, []);

  useEffect(() => {
    fetchLastValue();
  }, [fetchLastValue]);

  const handleGhostClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">RampAI 👻</span>
          </h1>
          <div className="mt-4">
            <span>Easily convert your crypto to fiat and viceversa. Now with AI!</span>
          </div>
        </div>
        <div className="py-5">
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="tabs ">
              <button
                className={`tab text-lg tab-bordered ${activeTab === "Sell" ? "tab-active bg-base-200 rounded-lg" : ""}`}
                onClick={() => setActiveTab("Sell")}
              >
                Sell UXD
              </button>
              <button
                className={`tab text-lg tab-bordered ${activeTab === "Buy" ? "tab-active bg-base-200 rounded-lg" : ""}`}
                onClick={() => setActiveTab("Buy")}
              >
                Buy UXD
              </button>
            </div>
            <div className="card-body items-center text-center">
              {activeTab === "Sell" && (
                <>
                  <h2 className="card-title">You give</h2>
                  <div className="flex flex-row gap-3 mb-2">
                    <InputBase value={sellValue} onChange={setSellValue} placeholder="0.00" />
                    <Image src="/uxdlogo.png" alt="Ethereum" width={40} height={40} />
                  </div>
                  <h2 className="card-title">to receive</h2>
                  <div className="flex flex-row items-center gap-3 mb-2">
                    <span>${lastValue && sellValue ? (parseFloat(sellValue) * lastValue).toFixed(2) : "0.00"}</span>
                    <Image src="/argentina.png" alt="UXD (dollars)" width={40} height={40} />
                  </div>
                  <div className="card-actions">
                    <button className="btn btn-primary bg-orange-800 border-0 sparkle">Send to Ripio!</button>
                  </div>
                </>
              )}
              {activeTab === "Buy" && (
                <>
                  <h2 className="card-title">You give</h2>
                  <div className="flex flex-row gap-3 mb-2">
                    <InputBase value={buyValue} onChange={setBuyValue} placeholder="0.00" />
                    <Image src="/argentina.png" alt="Ethereum" width={40} height={40} />
                  </div>
                  <h2 className="card-title">to receive</h2>
                  <div className="flex flex-row items-center gap-3 mb-2">
                    <span>${lastValue && buyValue ? (parseFloat(buyValue) / lastValue).toFixed(2) : "0.00"}</span>
                    <Image src="/uxdlogo.png" alt="UXD (dollars)" width={40} height={40} />
                  </div>
                  <div className="card-actions">
                    <button className="btn btn-primary bg-orange-800 border-0 sparkle">Buy with Ripio!</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div
            className="p-4 bg-blue-600 rounded-lg flex items-center justify-center text-2xl cursor-pointer"
            onClick={handleGhostClick}
          >
            AI helper! 👻
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleModalClick}
        >
          <div className="bg-base-200 p-5 rounded-lg text-center">
            <div className="text-6xl mb-4">👻</div>
            <p className="text-xl mb-4">AI companion coming soon!</p>
            <button className="btn btn-primary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
