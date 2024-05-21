"use client";

import { useState } from "react";

export default function NilaiForm() {
  const [kodematkul, setKodematkul] = useState("");
  const [nim, setNim] = useState("");
  const [nilai, setNilai] = useState("");

  return (
    <div className="flex flex-row w-full gap-12">
      <div className="w-1/2 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <label className="font-semibold">Kode Mata Kuliah</label>
          <div className="border border-gray-300 rounded-lg p-4">
            <select
              className="w-full focus:outline-none"
              value={kodematkul}
              onChange={(e) => setKodematkul(e.target.value)}
            >
              {/* gotta map these later on */}
              <option>II4170</option>
              <option>II3230</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="font-semibold">NIM</label>
          <div className="border border-gray-300 rounded-lg p-4">
            <select
              className="w-full focus:outline-none"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
            >
              {/* gotta map these later on */}
              <option>18221055</option>
              <option>18221069</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="font-semibold">Nilai</label>
          <input
            type="text"
            className="border border-gray-300 p-4 rounded-lg focus:outline-none"
            value={nilai}
            onChange={(e) => setNilai(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
