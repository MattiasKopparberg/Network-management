import Button from "../UI/button"

export default function Header() {
  return (
    <header className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to Alien Planet
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore planets, galaxies, and mysterious worlds in your
          fullstack application.
        </p>

        <Button>
          Explore Now
        </Button>
      </div>
    </header>
  );
}