import Landing from "@/components/Landing";

export default async function Home() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_WEB_URL + "/api/v1/all-data",
    {
      method: "GET",
    }
  );

  const data = await res.json();
  const { allMahasiswa } = data;
  return (
    <>
      <Landing allMahasiswa={allMahasiswa} />
    </>
  );
}
