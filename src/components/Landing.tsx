"use client";
import { Mahasiswa } from "@prisma/client";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { rc4ModifiedEncrypt, rc4ModifiedDecrypt } from "@/cipher/rc4Modified";
import { decryptRSA, generateKeyRSA } from "@/cipher/rsa";

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
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [isEncryptedSignature, setIsEncryptedSignature] = useState(true);

  const handleToggle = (checked: boolean) => {
    setIsEncrypted(checked);

    const decryptedData = handleEncryptDecrypt(allMahasiswa);

    if (checked) {
      console.log("Encrypted Data", decryptedData);
    } else {
      console.log("Decrypted Data", decryptedData);
    }
  };

  const handleEncryptDecrypt = (data: MahasiswaProps[]) => {
    // if (isEncrypted) {
    //   const decryptedData = data.map((mahasiswa) => {
    //     return {
    //       ...mahasiswa,
    //       nim: rc4ModifiedDecrypt(mahasiswa.nim, "bekasi"),
    //       nama: rc4ModifiedDecrypt(mahasiswa.nama, "bekasi"),
    //       tanda_tangan: decryptRSA(mahasiswa.tanda_tangan, RSAKeyPair.publicKey.e, RSAKeyPair.publicKey.n),
    //       jumlah_sks: rc4ModifiedDecrypt(mahasiswa.jumlah_sks ?? "0", "bekasi"),
    //       ipk: rc4ModifiedDecrypt(mahasiswa.ipk ?? "0", "bekasi"),
    //       Nilai: mahasiswa.Nilai.map((nilai) => {
    //         return {
    //           ...nilai,
    //           MataKuliah: {
    //             ...nilai.MataKuliah,
    //             kode_mata_kuliah: rc4ModifiedDecrypt(
    //               nilai.MataKuliah.kode_mata_kuliah,
    //               "bekasi"
    //             ),
    //             nama_mata_kuliah: rc4ModifiedDecrypt(
    //               nilai.MataKuliah.nama_mata_kuliah,
    //               "bekasi"
    //             ),
    //             sks: rc4ModifiedDecrypt(nilai.MataKuliah.sks, "bekasi"),
    //           },
    //           nilai: rc4ModifiedDecrypt(nilai.nilai, "bekasi"),
    //         };
    //       }),
    //     };
    //   });

    //   return decryptedData;
    // } else {
    //   const encryptedData = data.map((mahasiswa) => {
    //     return {
    //       ...mahasiswa,
    //       nim: rc4ModifiedEncrypt(mahasiswa.nim, "bekasi"),
    //       nama: rc4ModifiedEncrypt(mahasiswa.nama, "bekasi"),
    //       tanda_tangan: rc4ModifiedEncrypt(mahasiswa.tanda_tangan, "bekasi"),
    //       Nilai: mahasiswa.Nilai.map((nilai) => {
    //         return {
    //           ...nilai,
    //           MataKuliah: {
    //             ...nilai.MataKuliah,
    //             kode_mata_kuliah: rc4ModifiedEncrypt(
    //               nilai.MataKuliah.kode_mata_kuliah,
    //               "bekasi"
    //             ),
    //             nama_mata_kuliah: rc4ModifiedEncrypt(
    //               nilai.MataKuliah.nama_mata_kuliah,
    //               "bekasi"
    //             ),
    //             sks: rc4ModifiedEncrypt(nilai.MataKuliah.sks, "bekasi"),
    //           },
    //           nilai: rc4ModifiedEncrypt(nilai.nilai, "bekasi"),
    //         };
    //       }),
    //     };
    //   });

    //   return encryptedData;
    // }
  };

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
                handleToggle(e.target.checked);
              }}
              checked={isEncrypted}
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
              checked={isEncryptedSignature}
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
              <th className="bg-orange-300 p-2">Kode Matkul 1</th>
              <th className="bg-orange-300 p-2">Nama Matkul</th>
              <th className="bg-orange-300 p-2">Nilai</th>
              <th className="bg-orange-300 p-2">SKS</th>
              <th className="bg-orange-300 p-2">Kode Matkul 2</th>
              <th className="bg-orange-300 p-2">Nama Matkul</th>
              <th className="bg-orange-300 p-2">Nilai</th>
              <th className="bg-orange-300 p-2">SKS</th>
              <th className="bg-orange-300 p-2">Kode Matkul 3</th>
              <th className="bg-orange-300 p-2">Nama Matkul</th>
              <th className="bg-orange-300 p-2">Nilai</th>
              <th className="bg-orange-300 p-2">SKS</th>
              <th className="bg-orange-300 p-2">Kode Matkul 4</th>
              <th className="bg-orange-300 p-2">Nama Matkul</th>
              <th className="bg-orange-300 p-2">Nilai</th>
              <th className="bg-orange-300 p-2">SKS</th>
              <th className="bg-orange-300 p-2">Kode Matkul 5</th>
              <th className="bg-orange-300 p-2">Nama Matkul</th>
              <th className="bg-orange-300 p-2">Nilai</th>
              <th className="bg-orange-300 p-2">SKS</th>
              <th className="bg-orange-300 p-2">Kode Matkul 6</th>
              <th className="bg-orange-300 p-2">Nama Matkul</th>
              <th className="bg-orange-300 p-2">Nilai</th>
              <th className="bg-orange-300 p-2">SKS</th>
              <th className="bg-orange-300 p-2">Kode Matkul 7</th>
              <th className="bg-orange-300 p-2">Nama Matkul</th>
              <th className="bg-orange-300 p-2">Nilai</th>
              <th className="bg-orange-300 p-2">SKS</th>
              <th className="bg-orange-300 p-2">Kode Matkul 8</th>
              <th className="bg-orange-300 p-2">Nama Matkul</th>
              <th className="bg-orange-300 p-2">Nilai</th>
              <th className="bg-orange-300 p-2">SKS</th>
              <th className="bg-orange-300 p-2">Kode Matkul 9</th>
              <th className="bg-orange-300 p-2">Nama Matkul</th>
              <th className="bg-orange-300 p-2">Nilai</th>
              <th className="bg-orange-300 p-2">SKS</th>
              <th className="bg-orange-300 p-2">Kode Matkul 10</th>
              <th className="bg-orange-300 p-2">Nama Matkul</th>
              <th className="bg-orange-300 p-2">Nilai</th>
              <th className="bg-orange-300 p-2">SKS</th>
              <th className="bg-orange-300 p-2">Jumlah SKS</th>
              <th className="bg-orange-300 p-2">IPK</th>
              <th className="bg-orange-300 p-2">Tanda-tangan Digital</th>
            </tr>
          </thead>
          <tbody>
            {allMahasiswa.map((mahasiswa) => (
              <tr key={mahasiswa.nim}>
                <td className="border border-gray-300 p-2">
                  {isEncrypted ? mahasiswa.nim : mahasiswa.nim}
                </td>
                <td className="border border-gray-300 p-2">
                  {isEncrypted ? mahasiswa.nama : mahasiswa.nama}
                </td>
                {mahasiswa.Nilai.map((nilai) => (
                  <>
                    <td className="border border-gray-300 p-2">
                      {isEncrypted
                        ? nilai.MataKuliah.kode_mata_kuliah
                        : nilai.MataKuliah.kode_mata_kuliah}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {isEncrypted
                        ? nilai.MataKuliah.nama_mata_kuliah
                        : nilai.MataKuliah.nama_mata_kuliah}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {isEncrypted ? nilai.nilai : nilai.nilai}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {isEncrypted
                        ? nilai.MataKuliah.sks
                        : nilai.MataKuliah.sks}
                    </td>
                  </>
                ))}
                <td className="border border-gray-300 p-2">
                  {isEncrypted ? mahasiswa.jumlah_sks : mahasiswa.jumlah_sks}
                </td>
                <td className="border border-gray-300 p-2">
                  {isEncrypted ? mahasiswa.ipk : mahasiswa.ipk}
                </td>
                <td className="border border-gray-300 p-2">
                  {isEncryptedSignature
                    ? mahasiswa.tanda_tangan
                    : mahasiswa.tanda_tangan}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
