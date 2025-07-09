"use client";

import { BACKEND_URL } from "@/utils";
import axios from "axios";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  amount: number;
  title: string;
  options: {
    id: number;
    image_url: string;
    task_id: number;
  }[];
}

// CSR
export const NextTask = () => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/v1/worker/nextTask`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCurrentTask((res.data as { task: Task }).task);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setCurrentTask(null);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
            <div
              className="absolute inset-0 w-16 h-16 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin mx-auto"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>
          </div>
          <div className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Loading tasks...
          </div>
          <div className="text-gray-400 mt-2">
            Finding your next opportunity
          </div>
        </div>
      </div>
    );
  }

  if (!currentTask) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center backdrop-blur-sm border border-gray-600/30">
            <span className="text-4xl">😴</span>
          </div>
          <div className="text-2xl font-semibold text-gray-300 mb-4">
            No tasks available
          </div>
          <div className="text-gray-400 leading-relaxed">
            Please check back in some time, there are no pending tasks at the
            moment
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12">
      {/* Task title with glow effect */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          {currentTask.title}
        </h1>
        {submitting && (
          <div className="flex items-center justify-center gap-3 text-xl text-yellow-400 font-medium">
            <div className="w-5 h-5 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin"></div>
            Submitting your selection...
          </div>
        )}
      </div>

      {/* Image options */}
      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        {currentTask.options.map((option) => (
          <Option
            onSelect={async () => {
              setSubmitting(true);
              try {
                const response = await axios.post(
                  `${BACKEND_URL}/v1/worker/submission`,
                  {
                    taskId: currentTask.id.toString(),
                    selection: option.id.toString(),
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                const nextTask = (response.data as { nextTask?: Task })
                  .nextTask;
                if (nextTask) {
                  setCurrentTask(nextTask);
                } else {
                  setCurrentTask(null);
                }
                // refresh the user balance in the appbar
              } catch (e) {
                console.log(e);
              }
              setSubmitting(false);
            }}
            key={option.id}
            imageUrl={option.image_url}
          />
        ))}
      </div>
    </div>
  );
};

function Option({
  imageUrl,
  onSelect,
}: {
  imageUrl: string;
  onSelect: () => void;
}) {
  return (
    <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/30 transition-all duration-300">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Image */}
        <img
          onClick={onSelect}
          className="w-80 h-80 md:w-96 md:h-96 object-cover transition-transform duration-300 group-hover:scale-110"
          src={imageUrl || "/placeholder.svg"}
          alt="Task option"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Click indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
