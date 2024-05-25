"use client";
import { decryptMessage } from "@/cipher/aes";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FileDecrypt() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleDownload = async () => {
    if (file) {
      try {
        const keyString = "bekasi";
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const iv = uint8Array.slice(0, 16);
        const encryptedPdfBytes = uint8Array.slice(16);
        const decryptedPdfBytes = await decryptMessage(
          encryptedPdfBytes,
          keyString,
          iv
        );

        const blob = new Blob([decryptedPdfBytes], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `decrypted_${file.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast.success("File decrypted and downloaded successfully");
      } catch (error) {
        toast.error("Failed to decrypt file");
        console.error("Decryption error:", error);
      }
    } else {
      toast.error("Please upload a file first");
    }
  };

  return (
    <div className="px-[5%] py-20">
      <h1 className="text-4xl font-semibold mb-10">File Decryption</h1>

      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            {!file ? (
              <>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </>
            ) : (
              <p>{file?.name}</p>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <button
        className="mt-10 bg-blue-500 text-white px-4 py-2 w-full rounded-md"
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
}
