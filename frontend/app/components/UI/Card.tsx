export default function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white">
      {children}
    </div>
  );
}