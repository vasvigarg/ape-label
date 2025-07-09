"use client";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/utils";

export const Appbar = () => {
  const { publicKey, signMessage } = useWallet();

  async function signAndSend() {
    if (!publicKey) {
      return;
    }
    const message = new TextEncoder().encode("Sign into mechanical turks");
    const signature = await signMessage?.(message);
    console.log(signature);
    console.log(publicKey);
    const response = await axios.post(`${BACKEND_URL}/v1/user/signin`, {
      signature,
      publicKey: publicKey?.toString(),
    });
    localStorage.setItem("token", response.data.token);
  }

  useEffect(() => {
    signAndSend();
  }, [publicKey]);

  return (
    <div className="flex justify-between items-center border-b border-white/10 backdrop-blur-xl bg-black/20 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">🐵</span>
        </div>
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
          Ape Label
        </div>
      </div>

      <div className="wallet-adapter-button-trigger">
        <style jsx global>{`
          .wallet-adapter-button {
            background: linear-gradient(
              135deg,
              #8b5cf6 0%,
              #a855f7 50%,
              #c084fc 100%
            ) !important;
            border: 1px solid rgba(139, 92, 246, 0.3) !important;
            border-radius: 12px !important;
            color: white !important;
            font-weight: 600 !important;
            padding: 12px 24px !important;
            transition: all 0.3s ease !important;
            backdrop-filter: blur(10px) !important;
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.2) !important;
          }

          .wallet-adapter-button:hover {
            background: linear-gradient(
              135deg,
              #7c3aed 0%,
              #9333ea 50%,
              #a855f7 100%
            ) !important;
            box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4) !important;
            transform: translateY(-1px) !important;
          }

          .wallet-adapter-button:not([disabled]):hover {
            background: linear-gradient(
              135deg,
              #7c3aed 0%,
              #9333ea 50%,
              #a855f7 100%
            ) !important;
          }
        `}</style>
        {publicKey ? <WalletDisconnectButton /> : <WalletMultiButton />}
      </div>
    </div>
  );
};
