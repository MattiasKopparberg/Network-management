type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function Button({
  loading,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="w-full py-2 rounded-md bg-blue-600 text-white
                 hover:bg-blue-700 transition disabled:opacity-50"
    >
      {loading ? "Loading..." : children}
    </button>
  );
}