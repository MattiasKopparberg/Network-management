import Navbar from "@/app/components/layout/navBar"
import Footer from "@/app/components/layout/footer"

export const metadata = {
  title: "Alien Planet",
  description: "Fullstack Next.js app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}