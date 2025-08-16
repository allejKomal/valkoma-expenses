import type { PropsWithChildren } from "react";

interface NavbarProps extends PropsWithChildren {
  title: string;
  icon?: React.ReactNode;
}

export default function Navbar({ title, children, icon }: NavbarProps) {
  return (
    <div className="w-full  flex justify-between items-center">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-lg font-medium">{title}</span>
      </div>
      {children}
    </div>
  );
}
