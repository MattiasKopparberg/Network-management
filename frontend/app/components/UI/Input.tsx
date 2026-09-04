type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function Input({ label, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-gray-600">{label}</label>

      <input
        {...props}
        className="px-3 py-2 rounded-md border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}