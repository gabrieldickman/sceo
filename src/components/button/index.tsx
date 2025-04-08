"use client";

interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  icon,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-[var(--black-secondary)] rounded-md hover:bg-[var(--gray-dark)] cursor-pointer sm:w-150 p-5 flex flex-row items-center justify-center gap-5 ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}
