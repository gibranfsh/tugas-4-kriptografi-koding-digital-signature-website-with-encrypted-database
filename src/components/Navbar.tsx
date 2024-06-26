export default function Navbar() {
  return (
    <nav className="h-20 bg-black text-white flex justify-between px-[10%] items-center">
      <h1 className="font-semibold text-3xl">Digital Signature</h1>

      <ul className="text-2xl flex gap-8 w-3/5">
        <li>
          <a href="/">Database</a>
        </li>
        <li>
          <a href="/input">Input</a>
        </li>
        <li>
          <a href="/file">File</a>
        </li>
      </ul>
    </nav>
  );
}
