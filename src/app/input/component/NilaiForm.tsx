"use client";

import { rc4ModifiedDecrypt } from "@/cipher/rc4Modified";
import { Mahasiswa, MataKuliah, INDEKS } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NilaiForm({
  mahasiswa,
  mataKuliah,
}: {
  mahasiswa: Mahasiswa[];
  mataKuliah: MataKuliah[];
}) {
  const [kodematkul, setKodematkul] = useState(
    rc4ModifiedDecrypt(mataKuliah[0].kode_mata_kuliah, "bekasi")
  );
  const [nim, setNim] = useState(
    rc4ModifiedDecrypt(mahasiswa[0].nim, "bekasi")
  );
  const [nilai, setNilai] = useState(Object.values(INDEKS)[0]);

  const handleSubmit = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_WEB_URL + `/api/v1/nilai/${nim}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kode_mata_kuliah: kodematkul,
          nilai,
        }),
      }
    );

    if (res.ok) {
      toast.success("Data nilai berhasil disimpan");

      setKodematkul("");
      setNim("");
      setNilai("");
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
            <select
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none"
              onChange={(e) => setKodematkul(e.target.value)}
            >
              {mataKuliah.map((matkul) => (
                <option key={matkul.kode_mata_kuliah}>
                  {rc4ModifiedDecrypt(matkul.kode_mata_kuliah, "bekasi")}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-semibold">NIM</label>
            <select
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none"
              onChange={(e) => setNim(e.target.value)}
            >
              {mahasiswa.map((mhs) => (
                <option key={mhs.nim}>
                  {rc4ModifiedDecrypt(mhs.nim, "bekasi")}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-semibold">Nilai</label>
            <select
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none"
              onChange={(e) => setNilai(e.target.value)}
            >
              {Object.values(INDEKS).map((indeks) => (
                <option key={indeks}>{indeks}</option>
              ))}
            </select>
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
