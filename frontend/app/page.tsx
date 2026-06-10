import Header from "@/app/components/layout/header";
import Button from "@/app/components/UI/button";

export default function HomePage() {
  return (
    <div>
      <Header />

      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Explore the Universe
        </h2>

        <p className="text-gray-600 mb-6">
          Discover planets, systems, and data from your backend API.
        </p>

        <Button onClick={() => alert("Clicked!")}>
          Get Started
        </Button>
      </section>
    </div>
  );
}