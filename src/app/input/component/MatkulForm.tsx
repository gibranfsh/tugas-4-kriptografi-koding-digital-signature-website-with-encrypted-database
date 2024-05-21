"use client";

import { useState } from "react";

export default function MatkulForm() {
  const [kodematkul, setKodematkul] = useState("");
  const [nama, setNama] = useState("");
  const [sks, setSks] = useState(0);

  const handleSubmit = () => {
    console.log({
      kodematkul,
      nama,
      sks,
    });
  };

  return (
    <>
      <div className="flex flex-row w-full gap-12">
        <div className="w-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <label className="font-semibold">Kode Mata Kuliah</label>
            <input
              type="text"
              className="border border-gray-300 p-4 rounded-lg focus:outline-none"
              value={kodematkul}
              onChange={(e) => setKodematkul(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-semibold">Nama Mata Kuliah</label>
            <input
              type="text"
              className="border border-gray-300 p-4 rounded-lg focus:outline-none"
              value={kodematkul}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-semibold">Jumlah SKS</label>
            <input
              type="number"
              className="border border-gray-300 p-4 rounded-lg focus:outline-none"
              value={kodematkul}
              onChange={(e) => setSks(e.target.valueAsNumber)}
            />
          </div>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white p-4 rounded-lg hover:brightness-110 transition-all"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
}
