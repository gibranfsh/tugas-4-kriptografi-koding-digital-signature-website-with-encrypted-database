"use client";
import { KeyKetuaProgramStudi, Mahasiswa } from "@prisma/client";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { rc4ModifiedEncrypt, rc4ModifiedDecrypt } from "@/cipher/rc4Modified";
import { decryptRSA, encryptRSA, generateKeyRSA } from "@/cipher/rsa";
import { keccakHash } from "@/cipher/sha3";
import toast from "react-hot-toast";
import { generateTranscript } from "@/app/utils/generateTranscript";
import { encrypt } from "js-crypto-aes";
import { encryptMessage, generateIV } from "@/cipher/aes";

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
  newestKey,
}: {
  allMahasiswa: MahasiswaProps[];
  newestKey: KeyKetuaProgramStudi | null;
}) {
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [isEncryptedSignature, setIsEncryptedSignature] = useState(true);
  const [isGenerate, setIsGenerate] = useState(newestKey ? true : false);
  const [publicKey, setPublicKey] = useState<any>(
    newestKey
      ? {
          e: BigInt(newestKey.public_key_e),
          n: BigInt(newestKey.modulus_n),
        }
      : {}
  );
  const [privateKey, setPrivateKey] = useState<any>(
    newestKey
      ? {
          d: BigInt(newestKey.private_key_d),
          n: BigInt(newestKey.modulus_n),
        }
      : {}
  );
  const [mahasiswa, setMahasiswa] = useState<any>(allMahasiswa);

  function insertLineBreaks(text: string, charLimit: number): JSX.Element {
    const chunks = [];
    for (let i = 0; i < text.length; i += charLimit) {
      const chunk = text.substring(i, i + charLimit);
      chunks.push(
        <>
          {chunk}
          <br />
        </>
      );
    }
    return <>{chunks}</>;
  }

  const handleToggle = (checked: boolean) => {
    const data = handleEncryptDecrypt(mahasiswa);

    setIsEncrypted(checked);
    setMahasiswa(data);
  };

  const handleGenerateKey = async () => {
    const RSAKeyPair = generateKeyRSA(24);
    setPublicKey(RSAKeyPair.publicKey);
    setPrivateKey(RSAKeyPair.privateKey);

    const res = await fetch(
      process.env.NEXT_PUBLIC_WEB_URL + "/api/v1/kaprodi-key",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_key_e: RSAKeyPair.publicKey.e.toString(),
          private_key_d: RSAKeyPair.privateKey.d.toString(),
          modulus_n: RSAKeyPair.publicKey.n.toString(),
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success("Key berhasil di-generate");
      setIsGenerate(true);
    } else {
      toast.error(data.error ?? "Key gagal di-generate");
    }
  };

  const handleEncryptDecrypt = (data: MahasiswaProps[]) => {
    const RSAKeyPair = {
      publicKey: {
        e: publicKey.e,
        n: publicKey.n,
      },
      privateKey: {
        d: privateKey.d,
        n: privateKey.n,
      },
    };

    if (isEncrypted) {
      const decryptedData = data.map((mahasiswa) => {
        return {
          ...mahasiswa,
          nim: rc4ModifiedDecrypt(mahasiswa.nim, "bekasi"),
          nama: rc4ModifiedDecrypt(mahasiswa.nama, "bekasi"),
          tanda_tangan: rc4ModifiedDecrypt(mahasiswa.tanda_tangan, "bekasi"),
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
          jumlah_sks: rc4ModifiedEncrypt(mahasiswa.jumlah_sks ?? "0", "bekasi"),
          ipk: rc4ModifiedEncrypt(mahasiswa.ipk ?? "0", "bekasi"),
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

  async function handleSign(mahasiswa: MahasiswaProps) {
    const nilai = mahasiswa.Nilai;

    let signature = "";

    nilai.map((nilai: any) => {
      signature += rc4ModifiedDecrypt(
        nilai.MataKuliah.kode_mata_kuliah,
        "bekasi"
      );
      signature += rc4ModifiedDecrypt(
        nilai.MataKuliah.nama_mata_kuliah,
        "bekasi"
      );
      signature += rc4ModifiedDecrypt(nilai.MataKuliah.sks, "bekasi");
      signature += rc4ModifiedDecrypt(nilai.nilai, "bekasi");
    });

    signature = signature.replace(/ /g, "");

    signature = keccakHash(signature);

    console.log("keccaked", signature)

    const digitalSignature = encryptRSA(signature, privateKey.d, privateKey.n);

    console.log("digitalSignature", digitalSignature)

    const res = await fetch(
      process.env.NEXT_PUBLIC_WEB_URL + "/api/v1/mahasiswa",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nim: mahasiswa.nim,
          tanda_tangan: rc4ModifiedEncrypt(digitalSignature, "bekasi"),
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success("Tanda Tangan Digital berhasil disimpan");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error(data.error ?? "Tanda Tangan Digital gagal disimpan");
    }
  }

  async function handleVerify(mahasiswa: MahasiswaProps) {
    const nilai = mahasiswa.Nilai;

    let messageDigest1 = "";

    nilai.map((nilai: any) => {
      messageDigest1 += rc4ModifiedDecrypt(
        nilai.MataKuliah.kode_mata_kuliah,
        "bekasi"
      );
      messageDigest1 += rc4ModifiedDecrypt(
        nilai.MataKuliah.nama_mata_kuliah,
        "bekasi"
      );
      messageDigest1 += rc4ModifiedDecrypt(nilai.MataKuliah.sks, "bekasi");
      messageDigest1 += rc4ModifiedDecrypt(nilai.nilai, "bekasi");
    });

    messageDigest1 = messageDigest1.replace(/ /g, "");

    messageDigest1 = keccakHash(messageDigest1);

    const decryptedSignature = rc4ModifiedDecrypt(
      mahasiswa.tanda_tangan,
      "bekasi"
    );

    const messageDigest2 = decryptRSA(
      decryptedSignature as string,
      publicKey.e,
      publicKey.n
    );

    // console.log("publicKey.e", publicKey.e);
    // console.log("publicKey.n", publicKey.n);
    // console.log("mahasiswa.tanda_tangan", mahasiswa.tanda_tangan);
    // console.log("decryptedSignature", decryptedSignature);

    // console.log("messageDigest1", messageDigest1);
    // console.log("messageDigest2", messageDigest2);
    // console.log("isEqual", messageDigest1 === messageDigest2);

    if (messageDigest1 === messageDigest2) {
      toast.success("Tanda Tangan Digital Valid", {
        duration: 3000,
      });
    } else {
      toast.error("Tanda Tangan Digital Tidak Valid", {
        duration: 3000,
      });
    }
  }

  const handleDownload = async (mahasiswa: any) => {
    const loadingToast = toast.loading("Submitting data...");

    const nilaiMahasiswaDecrypted = mahasiswa.Nilai.map((nilai: any) => {
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
    });

    const mahasiswaDecrypted = {
      nim: rc4ModifiedDecrypt(mahasiswa.nim, "bekasi"),
      nama: rc4ModifiedDecrypt(mahasiswa.nama, "bekasi"),
      tanda_tangan: rc4ModifiedDecrypt(mahasiswa.tanda_tangan, "bekasi"),
      jumlah_sks: rc4ModifiedDecrypt(mahasiswa.jumlah_sks ?? "0", "bekasi"),
      ipk: rc4ModifiedDecrypt(mahasiswa.ipk ?? "0", "bekasi"),
      Nilai: nilaiMahasiswaDecrypted,
    };

    console.log("mahasiswaDecrypted", mahasiswaDecrypted);

    try {
      const pdfBytes = await generateTranscript(
        mahasiswaDecrypted,
        "I Gusti Bagus Baskara Nugraha, S.T., M.T., Ph.D."
      );

      const keyString = "bekasi";
      const iv = generateIV();
      const encryptedPdfBytes = await encryptMessage(
        new Uint8Array(pdfBytes),
        keyString,
        iv
      );

      const blob = new Blob([iv, encryptedPdfBytes], {
        type: "application/pdf",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${mahasiswaDecrypted.nim}_transcript_encrypted.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Transcript downloaded successfully", { id: loadingToast });
    } catch (error) {
      toast.error("Failed to download transcript", { id: loadingToast });
      console.error("Download error:", error);
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
            <span className="ms-3 text-sm font-medium text-gray-900">
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

      <button
        onClick={handleGenerateKey}
        className="bg-blue-500 p-2 w-32 text-white rounded-lg"
      >
        Generate Key
      </button>

      <div className="mt-6 flex flex-col gap-8">
        {mahasiswa.map((mahasiswa: any, index: number) => (
          <div key={index} className="border-2 rounded-lg border-gray-200 p-4">
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
                {mahasiswa.Nilai.map((nilai: any, index: number) => (
                  <tr key={index}>
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

            <div>
              <h1 className="font-semibold text-xl mt-8">IPK dan Jumlah SKS</h1>
              <p className="">IPK: {mahasiswa.ipk}</p>
              <p className="">Jumlah SKS: {mahasiswa.jumlah_sks}</p>
            </div>

            <div className="mt-6">
              <h1 className="font-semibold text-xl mt-8">
                Tanda Tangan Digital
              </h1>
              <p className="">
                {mahasiswa.tanda_tangan
                  ? insertLineBreaks(mahasiswa.tanda_tangan, 120)
                  : "Belum ada tanda-tangan."}
              </p>

              <div className="flex gap-4 mt-4">
                <button
                  disabled={!isGenerate || !isEncrypted}
                  className={`${
                    isGenerate && isEncrypted ? "bg-blue-500" : "bg-blue-300"
                  } p-2 w-32 text-white rounded-lg`}
                  onClick={() => handleSign(mahasiswa)}
                >
                  Sign
                </button>
                <button
                  disabled={!isGenerate || !isEncrypted}
                  className={`${
                    isGenerate && isEncrypted ? "bg-blue-500" : "bg-blue-300"
                  } p-2 w-32 text-white rounded-lg`}
                  onClick={() => handleVerify(mahasiswa)}
                >
                  Verify
                </button>
                <button
                  disabled={!isGenerate || !isEncrypted}
                  className={`${
                    isGenerate && isEncrypted ? "bg-blue-500" : "bg-blue-300"
                  } p-2 w-32 text-white rounded-lg`}
                  onClick={() => handleDownload(mahasiswa)}
                >
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
