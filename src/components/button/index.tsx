"use client"

interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, icon, onClick, className}: ButtonProps) {
  return (
    <button
      className="bg-[var(--black-secondary)] w-150 p-5 rounded-md hover:bg-[var(--gray-dark)] cursor-pointer flex flex-row items-center justify-center gap-5"
    >
      {icon}
      {children}
    </button>
  );
}
