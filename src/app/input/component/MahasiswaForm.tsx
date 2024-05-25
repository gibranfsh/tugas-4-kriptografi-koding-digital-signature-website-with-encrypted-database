"use client";

import { rc4ModifiedEncrypt } from "@/cipher/rc4Modified";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MahasiswaForm() {
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");

  const handleSubmit = async () => {
    const nimencrypted = rc4ModifiedEncrypt(nim, "bekasi");
    const namaencrypted = rc4ModifiedEncrypt(nama, "bekasi");

    const res = await fetch(
      process.env.NEXT_PUBLIC_WEB_URL + "/api/v1/mahasiswa",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nim: nimencrypted,
          nama: namaencrypted,
        }),
      }
    );

    if (res.ok) {
      toast.success("Data mahasiswa berhasil disimpan");

      setNim("");
      setNama("");
    } else
      toast.error(
        "Data mahasiswa gagal disimpan, silahkan coba lagi atau hubungi admin"
      );
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
