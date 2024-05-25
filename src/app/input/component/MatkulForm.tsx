"use client";

import { rc4ModifiedEncrypt } from "@/cipher/rc4Modified";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MatkulForm() {
  const [kodematkul, setKodematkul] = useState("");
  const [nama, setNama] = useState("");
  const [sks, setSks] = useState(0);

  const handleSubmit = async () => {
    const res = await fetch("/api/v1/mata-kuliah", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kode_mata_kuliah: rc4ModifiedEncrypt(kodematkul, "bekasi"),
        nama_mata_kuliah: rc4ModifiedEncrypt(nama, "bekasi"),
        sks: rc4ModifiedEncrypt(sks.toString(), "bekasi"),
      }),
    });

    if (res.ok) {
      toast.success("Data mata kuliah berhasil disimpan");
      
      setKodematkul("");
      setNama("");
      setSks(0);
    } else
      toast.error(
        "Data mata kuliah gagal disimpan, silahkan coba lagi atau hubungi admin"
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
            <label className="font-semibold">Nama Mata Kuliah</label>
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
              value={sks}
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
