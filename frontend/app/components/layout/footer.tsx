import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2">
            Alien Planet
          </h2>

          <p className="text-gray-400 max-w-sm">
            A modern Next.js fullstack project exploring planets and space.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Link href="/" className="hover:text-blue-400">
            Home
          </Link>

          <Link href="/about" className="hover:text-blue-400">
            About
          </Link>

          <Link href="/contact" className="hover:text-blue-400">
            Contact
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-gray-500 text-sm">
        © 2026 Alien Planet. All rights reserved.
      </div>
    </footer>
  );
}