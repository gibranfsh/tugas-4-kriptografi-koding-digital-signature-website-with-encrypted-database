"use client";

import { rc4ModifiedEncrypt } from "@/cipher/rc4Modified";
import { encryptRSA, generate_key } from "@/cipher/rsa";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MahasiswaForm() {
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [jumlahsks, setJumlahsks] = useState(0);
  const [ipk, setIpk] = useState(0);

  const handleSubmit = async () => {
    const tandatanganString = `${nim}${nama}${jumlahsks}${ipk}`;
    const key = generate_key(24);

    const nimencrypted = rc4ModifiedEncrypt(nim, "bekasi");
    const namaencrypted = rc4ModifiedEncrypt(nama, "bekasi");
    const jumlahsksencrypted = rc4ModifiedEncrypt(
      jumlahsks.toString(),
      "bekasi"
    );
    const ipkencrypted = rc4ModifiedEncrypt(ipk.toString(), "bekasi");
    const tandatanganencrypted = encryptRSA(
      tandatanganString,
      key.privateKey.d,
      key.privateKey.n
    );

    const res = await fetch("/api/v1/mahasiswa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nim: nimencrypted,
        nama: namaencrypted,
        jumlah_sks: jumlahsksencrypted,
        ipk: ipkencrypted,
        tanda_tangan: tandatanganencrypted,
      }),
    });

    if (res.ok) {
      toast.success("Data mahasiswa berhasil disimpan");
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
            <label className="font-semibold">Jumlah SKS</label>
            <input
              type="number"
              className="border border-gray-300 p-4 rounded-lg focus:outline-none"
              value={jumlahsks}
              onChange={(e) => setJumlahsks(e.target.valueAsNumber)}
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
