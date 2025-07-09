"use client";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { UploadImage } from "@/components/UploadImage";
import { BACKEND_URL } from "@/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

export const Upload = () => {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [txSignature, setTxSignature] = useState("");
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const router = useRouter();

  async function onSubmit() {
    const response = await axios.post(
      `${BACKEND_URL}/v1/user/task`,
      {
        options: images.map((image) => ({
          imageUrl: image,
        })),
        title,
        signature: txSignature,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = response.data as { id: string };
    router.push(`/task/${data.id}`);
  }

  async function makePayment() {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey!,
        toPubkey: new PublicKey("8CDX1aV1Sim1wo95UC8BuSje4ZmpyDoLf41nGJryVxCu"),
        lamports: 100000000,
      })
    );

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    const signature = await sendTransaction(transaction, connection, {
      minContextSlot,
    });

    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature,
    });

    setTxSignature(signature);
  }

  return (
    <div className="flex justify-center px-4 pb-20">
      <div className="max-w-4xl w-full">
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Create a Task
            </h2>
            <p className="text-gray-400">
              Deploy your data labeling task on Solana
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-gray-200 mb-3">
                Task Details
              </label>
              <div className="relative">
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                  className="w-full bg-black/40 backdrop-blur-sm border border-purple-500/30 text-white text-lg rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 placeholder-gray-400"
                  placeholder="What is your task?"
                  required
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-200 mb-4">
                Add Images
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                {images.map((image, index) => (
                  <UploadImage
                    key={index}
                    image={image}
                    onImageAdded={(imageUrl) => {
                      setImages((i) => [...i, imageUrl]);
                    }}
                  />
                ))}
              </div>

              <div className="flex justify-center">
                <UploadImage
                  onImageAdded={(imageUrl) => {
                    setImages((i) => [...i, imageUrl]);
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <button
                onClick={txSignature ? onSubmit : makePayment}
                type="button"
                className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-500 hover:via-violet-500 hover:to-purple-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 border border-purple-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <span className="text-2xl">⚡</span>
                  <span>{txSignature ? "Submit Task" : "Pay 0.1 SOL"}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
