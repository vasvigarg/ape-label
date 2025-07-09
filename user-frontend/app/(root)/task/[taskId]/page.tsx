"use client";
import { Appbar } from "@/components/Appbar";
import { BACKEND_URL } from "@/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { use } from "react";

// Define the types for the API response
interface TaskResult {
  [key: string]: {
    count: number;
    option: {
      imageUrl: string;
    };
  };
}

interface TaskDetails {
  title?: string;
}

interface ApiResponse {
  result: TaskResult;
  taskDetails: TaskDetails;
}

async function getTaskDetails(taskId: string): Promise<ApiResponse> {
  const response = await axios.get<ApiResponse>(
    `${BACKEND_URL}/v1/user/task?taskId=${taskId}`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}

export default function Page({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = use(params);

  const [result, setResult] = useState<TaskResult>({});
  const [taskDetails, setTaskDetails] = useState<TaskDetails>({});

  useEffect(() => {
    getTaskDetails(taskId).then((data) => {
      setResult(data.result);
      setTaskDetails(data.taskDetails);
    });
  }, [taskId]);

  return (
    <div>
      <Appbar />
      <div className="text-2xl pt-20 flex justify-center">
        {taskDetails.title}
      </div>
      <div className="flex justify-center pt-8">
        {Object.keys(result || {}).map((taskId) => (
          <Task
            key={taskId}
            imageUrl={result[taskId].option.imageUrl}
            votes={result[taskId].count}
          />
        ))}
      </div>
    </div>
  );
}

function Task({ imageUrl, votes }: { imageUrl: string; votes: number }) {
  return (
    <div>
      <img className={"p-2 w-96 rounded-md"} src={imageUrl} />
      <div className="flex justify-center">{votes}</div>
    </div>
  );
}
