import InputPage from "./InputPage";
import { prisma } from "@/app/lib/prisma";

export default async function Page() {
  const res_mahasiswa = await fetch(
    process.env.NEXT_PUBLIC_WEB_URL + "/api/v1/mahasiswa",
    {
      method: "GET",
    }
  );

  const res_mata_kuliah = await fetch(
    process.env.NEXT_PUBLIC_WEB_URL + "/api/v1/mata-kuliah",
    {
      method: "GET",
    }
  );

  const data_mahasiswa = await res_mahasiswa.json();
  const data_mata_kuliah = await res_mata_kuliah.json();

  const { mahasiswa } = data_mahasiswa;
  const { mataKuliah } = data_mata_kuliah;

  return (
    <>
      <InputPage mahasiswa={mahasiswa} mataKuliah={mataKuliah} />
    </>
  );
}
