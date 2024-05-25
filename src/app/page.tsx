import Landing from "@/components/Landing";
import { prisma } from "@/app/lib/prisma";

export default async function Home() {
  // const res_all_mahasiswa = await fetch(
  //   process.env.NEXT_PUBLIC_WEB_URL + "/api/v1/all-data",
  //   {
  //     method: "GET",
  //   }
  // );

  // const res_kaprodi_key = await fetch(
  //   process.env.NEXT_PUBLIC_WEB_URL + "/api/v1/kaprodi-key",
  //   {
  //     method: "GET",
  //   }
  // );

  const newestKey = await prisma.keyKetuaProgramStudi.findFirst({
    orderBy: {
      created_at: "desc",
    },
  });

  const allMahasiswa = await prisma.mahasiswa.findMany({
    include: {
        Nilai: {
            include: {
                MataKuliah: true,
            },
        },
    },
});

  // const data_all_mahasiswa = await res_all_mahasiswa.json();
  // const data_kaprodi_key = await res_kaprodi_key.json();

  // const { allMahasiswa } = data_all_mahasiswa;
  // const { newestKey } = data_kaprodi_key;

  return (
    <>
      <Landing allMahasiswa={allMahasiswa} newestKey={newestKey}/>
    </>
  );
}
