import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="font-bold text-lg text-gray-900">
            NetControl
          </h2>

          <p className="text-sm text-gray-600 mt-2">
            A fullstack network management system built with Next.js, Express, and MySQL.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Navigation</span>

          <Link href="/" className="hover:text-black">
            Home
          </Link>

          <Link href="/dashboard" className="hover:text-black">
            Dashboard
          </Link>

          <Link href="/devices" className="hover:text-black">
            Devices
          </Link>
        </div>

        <div className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">Project</span>

          <p className="mt-2">
            Built for learning fullstack architecture, authentication, and self-hosting.
          </p>
        </div>

      </div>

      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} NetControl. All rights reserved.
      </div>
    </footer>
  );
}