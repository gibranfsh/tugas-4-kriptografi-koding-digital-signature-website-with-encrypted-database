"use client";
import { Mahasiswa } from "@prisma/client";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface MahasiswaProps extends Mahasiswa {
  Nilai: {
    nilai: string;
    MataKuliah: {
      kode_mata_kuliah: string;
      nama_mata_kuliah: string;
      sks: string;
    };
  }[];
}

export default function Landing({
  allMahasiswa,
}: {
  allMahasiswa: MahasiswaProps[];
}) {
  console.log(allMahasiswa);
  const handleDecrypt = (data: MahasiswaProps[]) => {};
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [isEncryptedSignature, setIsEncryptedSignature] = useState(false);

  return (
    <div className="py-8 px-[5%]">
      <div className="flex gap-4 items-center justify-between">
        <h1 className="font-semibold text-2xl">Database Mahasiswa</h1>
        <div className="flex gap-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer focus:outline-none"
              onChange={(e) => {
                setIsEncrypted(e.target.checked);
                handleDecrypt(allMahasiswa);
              }}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Encrypt Data
            </span>
          </label>

          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer focus:outline-none"
              onChange={(e) => {
                setIsEncryptedSignature(e.target.checked);
              }}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Encrypt Tanda Tangan
            </span>
          </label>

          <div className="border border-gray-300 px-4 py-2 rounded-lg flex gap-4 items-center">
            <AiOutlineSearch className="text-2xl" />
            <input
              type="text"
              placeholder="Cari mahasiswa..."
              className="focus:outline-none rounded-lg p-2 w-full"
            />
          </div>
        </div>
      </div>

      <div>
        <table className="w-full mt-8">
          <thead>
            <tr>
              <th className="bg-orange-300 p-2">NIM</th>
              <th className="bg-orange-300 p-2">Nama</th>
              <th className="bg-orange-300 p-2">Kode Matkul</th>
              <th className="bg-orange-300 p-2">Nama Matkul</th>
              <th className="bg-orange-300 p-2">Nilai</th>
              <th className="bg-orange-300 p-2">SKS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">1234567890</td>
              <td className="border border-gray-300 p-2">John Doe</td>
              <td className="border border-gray-300 p-2">II4190</td>
              <td className="border border-gray-300 p-2">
                Komunikasi Interpersonal
              </td>
              <td className="border border-gray-300 p-2">A</td>
              <td className="border border-gray-300 p-2">3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
