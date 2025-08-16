// src/components/Header.tsx
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Receipt } from "lucide-react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const links = [
    { label: "Home", to: "/" },
    { label: "Category List", to: "/category-list" },
  ];

  return (
    <header className="w-full border-b border-border bg-background p-2">
      <nav className="flex justify-between">
        <div className="flex items-center justify-between gap-6 w-full px-10">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tighter flex items-center gap-1"
          >
            <Receipt />
            Expense Tracker
          </Link>
          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {links.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink
                      href={item.to}
                      className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
