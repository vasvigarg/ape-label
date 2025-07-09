"use client";

import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/utils";

export const Appbar = () => {
  const { publicKey, signMessage } = useWallet();
  const [balance, setBalance] = useState(0);

  async function signAndSend() {
    if (!publicKey) {
      return;
    }
    const message = new TextEncoder().encode(
      "Sign into mechanical turks as a worker"
    );
    const signature = await signMessage?.(message);
    console.log(signature);
    console.log(publicKey);
    const response = await axios.post(`${BACKEND_URL}/v1/worker/signin`, {
      signature,
      publicKey: publicKey?.toString(),
    });
    const data = response.data as { amount: number; token: string };
    setBalance(data.amount);
    localStorage.setItem("token", data.token);
  }

  useEffect(() => {
    signAndSend();
  }, [publicKey]);

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10 shadow-2xl">
      <div className="flex justify-between items-center py-4 px-6">
        {/* Logo with glow effect */}
        <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
          <span className="relative">
            Ape Label
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 blur-lg opacity-30 -z-10"></div>
          </span>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Payout button */}
          <button
            onClick={() => {
              axios.post(
                `${BACKEND_URL}/v1/worker/payout`,
                {},
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
            }}
            className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-emerald-400/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-2">
              💰 Pay me out ({balance}) SOL
            </span>
          </button>

          {/* Wallet buttons with custom styling */}
          <div className="wallet-adapter-button-trigger-wrapper">
            {publicKey ? (
              <div className="wallet-disconnect-button-wrapper">
                <WalletDisconnectButton />
              </div>
            ) : (
              <div className="wallet-multi-button-wrapper">
                <WalletMultiButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
