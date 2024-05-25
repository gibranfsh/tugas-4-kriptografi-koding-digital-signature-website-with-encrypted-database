"use client";
import { Mahasiswa } from "@prisma/client";
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

export default function Landing({ allMahasiswa }: { allMahasiswa: MahasiswaProps[] }) {
  console.log(allMahasiswa);
  const handleDecrypt = (data: MahasiswaProps[]) => {};
  return (
    <div className="py-8 px-[5%]">
      <div className="flex gap-4 items-center justify-between">
        <h1 className="font-semibold text-2xl">Database Mahasiswa</h1>

        <div className="border border-gray-300 px-4 py-2 rounded-lg flex gap-4 items-center">
          <AiOutlineSearch className="text-2xl" />
          <input
            type="text"
            placeholder="Cari mahasiswa..."
            className="focus:outline-none rounded-lg p-2 w-full"
          />
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
