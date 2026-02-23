type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger" | "success" | "ghost";
};

const variants: Record<NonNullable<Props["variant"]>, string> = {
  primary: "bg-indigo-600 text-white",
  danger: "bg-red-600 text-white",
  success: "bg-emerald-600 text-white",
  ghost: "border border-gray-200 text-gray-900 bg-white",
};

export function BigButton({ children, onClick, disabled, variant = "primary" }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "w-full rounded-3xl py-6 text-xl font-bold shadow-md hover:shadow-lg transition",
        variants[variant],
        disabled ? "opacity-40 active:scale-100" : "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
