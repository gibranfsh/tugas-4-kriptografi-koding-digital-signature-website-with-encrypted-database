"use client";

import { useState } from "react";

export default function InputPage() {
  const [type, setType] = useState("Mahasiswa");
  return (
    <div className="px-[5%] py-20">
      <h1 className="font-bold text-2xl">Input Type</h1>

      <div className="p-2 border-2 mt-6 w-1/2 border-gray-300 rounded-lg">
        <select className="w-full p-2 focus:outline-none">
          <option>Mahasiswa</option>
          <option>Nilai</option>
          <option>Mata Kuliah</option>
        </select>
      </div>

      {/* write your code here */}
    </div>
  );
}
