"use client";

import { useState } from "react";
import MahasiswaForm from "./component/MahasiswaForm";
import NilaiForm from "./component/NilaiForm";
import MatkulForm from "./component/MatkulForm";
import { Mahasiswa, MataKuliah } from "@prisma/client";

export default function InputPage({
  mahasiswa,
  mataKuliah,
}: {
  mahasiswa: Mahasiswa[];
  mataKuliah: MataKuliah[];
}) {
  const [type, setType] = useState("Mahasiswa");
  return (
    <div className="px-[5%] py-20 flex flex-col gap-12">
      <h1 className="font-bold text-2xl">Input Type</h1>

      <div className="p-2 border-2 w-1/2 border-gray-300 rounded-lg">
        <select
          className="w-full p-2 focus:outline-none"
          onChange={(e) => setType(e.target.value)}
        >
          <option>Mahasiswa</option>
          <option>Nilai</option>
          <option>Mata Kuliah</option>
        </select>
      </div>

      {/* write your code here */}
      {type == "Mahasiswa" ? (
        <MahasiswaForm />
      ) : type == "Nilai" ? (
        <NilaiForm mahasiswa={mahasiswa} mataKuliah={mataKuliah}/>
      ) : (
        <MatkulForm />
      )}
    </div>
  );
}
