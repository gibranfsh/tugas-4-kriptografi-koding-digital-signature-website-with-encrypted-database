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

  // function insertLineBreaks(text: string, charLimit: number): JSX.Element {
  //   const chunks = [];
  //   for (let i = 0; i < text.length; i += charLimit) {
  //     const chunk = text.substring(i, i + charLimit);
  //     chunks.push(
  //       <>
  //         {chunk}
  //         <br />
  //       </>
  //     );
  //   }
  //   return <>{chunks}</>;
  // }

  const [mahasiswa, setMahasiswa] = useState<any>(allMahasiswa);

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
    const RSAKeyPair = generateKeyRSA(24);

    if (isEncrypted) {
      const decryptedData = data.map((mahasiswa) => {
        return {
          ...mahasiswa,
          nim: rc4ModifiedDecrypt(mahasiswa.nim, "bekasi"),
          nama: rc4ModifiedDecrypt(mahasiswa.nama, "bekasi"),
          tanda_tangan: decryptRSA(
            mahasiswa.tanda_tangan,
            RSAKeyPair.publicKey.e,
            RSAKeyPair.publicKey.n
          ),
          jumlah_sks: rc4ModifiedDecrypt(mahasiswa.jumlah_sks ?? "0", "bekasi"),
          ipk: rc4ModifiedDecrypt(mahasiswa.ipk ?? "0", "bekasi"),
          Nilai: mahasiswa.Nilai.map((nilai) => {
            return {
              ...nilai,
              MataKuliah: {
                ...nilai.MataKuliah,
                kode_mata_kuliah: rc4ModifiedDecrypt(
                  nilai.MataKuliah.kode_mata_kuliah,
                  "bekasi"
                ),
                nama_mata_kuliah: rc4ModifiedDecrypt(
                  nilai.MataKuliah.nama_mata_kuliah,
                  "bekasi"
                ),
                sks: rc4ModifiedDecrypt(nilai.MataKuliah.sks, "bekasi"),
              },
              nilai: rc4ModifiedDecrypt(nilai.nilai, "bekasi"),
            };
          }),
        };
      });
      setMahasiswa(decryptedData);
      return decryptedData;
    } else {
      const encryptedData = data.map((mahasiswa) => {
        return {
          ...mahasiswa,
          nim: rc4ModifiedEncrypt(mahasiswa.nim, "bekasi"),
          nama: rc4ModifiedEncrypt(mahasiswa.nama, "bekasi"),
          tanda_tangan: rc4ModifiedEncrypt(mahasiswa.tanda_tangan, "bekasi"),
          Nilai: mahasiswa.Nilai.map((nilai) => {
            return {
              ...nilai,
              MataKuliah: {
                ...nilai.MataKuliah,
                kode_mata_kuliah: rc4ModifiedEncrypt(
                  nilai.MataKuliah.kode_mata_kuliah,
                  "bekasi"
                ),
                nama_mata_kuliah: rc4ModifiedEncrypt(
                  nilai.MataKuliah.nama_mata_kuliah,
                  "bekasi"
                ),
                sks: rc4ModifiedEncrypt(nilai.MataKuliah.sks, "bekasi"),
              },
              nilai: rc4ModifiedEncrypt(nilai.nilai, "bekasi"),
            };
          }),
        };
      });
      setMahasiswa(encryptedData);
      return encryptedData;
    }
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

      <div className="mt-6 flex flex-col gap-8">
        {mahasiswa.map((mahasiswa: any) => (
          <div key={mahasiswa.nim} className="border-2 rounded-lg border-gray-200 p-4">
            <h1 className="font-semibold text-xl mt-8">
              {mahasiswa.nim} - {mahasiswa.nama}
            </h1>
            <table className="w-full mt-8">
              <thead>
                <tr>
                  <th className="bg-orange-300 p-2">Kode Matkul</th>
                  <th className="bg-orange-300 p-2">Nama Matkul</th>
                  <th className="bg-orange-300 p-2">Nilai</th>
                  <th className="bg-orange-300 p-2">SKS</th>
                </tr>
              </thead>

              <tbody>
                {mahasiswa.Nilai.map((nilai: any) => (
                  <tr key={mahasiswa.nim}>
                    <td className="border border-gray-300 p-2">
                      {nilai.MataKuliah.kode_mata_kuliah}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {nilai.MataKuliah.nama_mata_kuliah}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {nilai.nilai}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {nilai.MataKuliah.sks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6">
              <h1 className="font-semibold text-xl mt-8">
                Tanda Tangan Digital
              </h1>
              <p className="">
                {(mahasiswa.tanda_tangan, 100)}
              </p>

              <div className="flex gap-4 mt-4">
                <button className="bg-blue-500 p-2 w-32 text-white rounded-lg">
                  Verify
                </button>
                <button className="bg-blue-500 p-2 w-32 text-white rounded-lg">
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
