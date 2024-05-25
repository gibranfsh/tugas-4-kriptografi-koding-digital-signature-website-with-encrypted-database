"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function NilaiForm() {
  const [kodematkul, setKodematkul] = useState("");
  const [nim, setNim] = useState("");
  const [nilai, setNilai] = useState("");

  const handleSubmit = async () => {
    const res = await fetch(`/api/v1/nilai/${nim}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kode_mata_kuliah: kodematkul,
        nilai,
      }),
    });

    if (res.ok) {
      toast.success("Data nilai berhasil disimpan");
    } else
      toast.error(
        "Data nilai gagal disimpan, silahkan coba lagi atau hubungi admin"
      );
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
            <label className="font-semibold">NIM</label>
            <input
              type="text"
              className="border border-gray-300 p-4 rounded-lg focus:outline-none"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
            />
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
      <button
        className="bg-blue-500 text-white p-4 rounded-lg hover:brightness-110 transition-all"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
}
