"use client";

import { useState } from "react";

export default function MahasiswaForm() {
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [jumlahsks, setJumlahsks] = useState(0);
  const [ipk, setIpk] = useState(0);
  const [tandatangan, setTandatangan] = useState("");

  const handleSubmit = () => {
    console.log({
      nim,
      nama,
      jumlahsks,
      ipk,
      tandatangan,
    });
  };

  return (
    <>
      <div className="flex flex-row w-full gap-12">
        <div className="w-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <label className="font-semibold">NIM</label>
            <input
              type="text"
              className="border border-gray-300 p-4 rounded-lg focus:outline-none"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-semibold">Nama</label>
            <input
              type="text"
              className="border border-gray-300 p-4 rounded-lg focus:outline-none"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-semibold">Jumlah SKS</label>
            <input
              type="number"
              className="border border-gray-300 p-4 rounded-lg focus:outline-none"
              value={jumlahsks}
              onChange={(e) => setJumlahsks(e.target.valueAsNumber)}
            />
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <label className="font-semibold">IPK</label>
            <input
              type="number"
              className="border border-gray-300 p-4 rounded-lg focus:outline-none"
              value={ipk}
              onChange={(e) => setIpk(e.target.valueAsNumber)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-semibold">Tanda Tangan</label>
            <input
              type="text"
              className="border border-gray-300 p-4 rounded-lg focus:outline-none"
              value={tandatangan}
              onChange={(e) => setTandatangan(e.target.value)}
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
