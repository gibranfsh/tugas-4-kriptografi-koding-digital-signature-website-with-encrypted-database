import Landing from "@/components/Landing";
import { prisma } from "@/app/lib/prisma";

export default async function Home() {
  // const res = await fetch(
  //   process.env.NEXT_PUBLIC_WEB_URL + "/api/v1/all-data",
  //   {
  //     method: "GET",
  //   }
  // );

  // const data = await res.json();
  // const { allMahasiswa } = data;
  const allMahasiswa = await prisma.mahasiswa.findMany({
    include: {
        Nilai: {
            include: {
                MataKuliah: true,
            },
        },
    },
});
  return (
    <>
      <Landing allMahasiswa={allMahasiswa} />
    </>
  );
}
