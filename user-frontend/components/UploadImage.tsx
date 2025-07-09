"use client";
import { BACKEND_URL, CLOUDFRONT_URL } from "@/utils";
import axios from "axios";
import { useState } from "react";

export function UploadImage({
  onImageAdded,
  image,
}: {
  onImageAdded: (image: string) => void;
  image?: string;
}) {
  const [uploading, setUploading] = useState(false);

  async function onFileSelect(e: any) {
    setUploading(true);
    try {
      const file = e.target.files[0];
      const response = await axios.get(`${BACKEND_URL}/v1/user/presignedUrl`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      type PresignedUrlResponse = {
        preSignedUrl: string;
        fields: Record<string, string>;
      };
      const data = response.data as PresignedUrlResponse;

      const presignedUrl = data.preSignedUrl;
      const formData = new FormData();
      formData.set("bucket", data.fields["bucket"]);
      formData.set("X-Amz-Algorithm", data.fields["X-Amz-Algorithm"]);
      formData.set("X-Amz-Credential", data.fields["X-Amz-Credential"]);
      formData.set("X-Amz-Algorithm", data.fields["X-Amz-Algorithm"]);
      formData.set("X-Amz-Date", data.fields["X-Amz-Date"]);
      formData.set("key", data.fields["key"]);
      formData.set("Policy", data.fields["Policy"]);
      formData.set("X-Amz-Signature", data.fields["X-Amz-Signature"]);
      formData.set("X-Amz-Algorithm", data.fields["X-Amz-Algorithm"]);
      formData.append("file", file);

      const awsResponse = await axios.post(presignedUrl, formData);
      onImageAdded(`${CLOUDFRONT_URL}/${data.fields["key"]}`);
    } catch (e) {
      console.log(e);
    }
    setUploading(false);
  }

  if (image) {
    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
        <img
          className="relative w-full h-48 object-cover rounded-2xl border border-purple-400/30 shadow-lg backdrop-blur-sm"
          src={image || "/placeholder.svg"}
          alt="Uploaded content"
        />
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>

      <div className="relative w-48 h-48 rounded-2xl border-2 border-dashed border-purple-400/40 hover:border-purple-400/60 cursor-pointer backdrop-blur-sm bg-black/20 transition-all duration-300 group-hover:bg-black/30">
        <div className="h-full flex justify-center items-center flex-col relative w-full">
          {uploading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mb-3"></div>
              <div className="text-sm text-purple-300 font-medium">
                Uploading...
              </div>
            </div>
          ) : (
            <>
              <div className="text-6xl text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                +
              </div>
              <div className="text-sm text-gray-300 font-medium">Add Image</div>
              <div className="text-xs text-gray-500 mt-1">Click to upload</div>

              <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                accept="image/*"
                onChange={onFileSelect}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
