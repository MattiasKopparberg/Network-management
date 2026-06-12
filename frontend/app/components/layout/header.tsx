"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link href="/" className="font-bold text-lg text-gray-900">
          NetControl
        </Link>

        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>

          <Link href="/dashboard" className="hover:text-black transition">
            Dashboard
          </Link>

          <Link href="/devices" className="hover:text-black transition">
            Devices
          </Link>

          <Link href="/login" className="hover:text-black transition">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}