import { Receipt } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  DropdownMenu,
  DropdownMenuTrigger,
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Input,
} from "valkoma-package/primitive";
import FieldSet from "./field-set";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "@/redux/user-slice";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [keyp, setKeyp] = useState("");
  const [secretp, setSecretp] = useState("");
  const dispatch = useDispatch();
  // const shouldSkip = useMemo( isAuthenticated || !key || !secret; // Skip if the user is authenticated or key/secret are missing

  // // Fetch users data only if authentication is false or missing key/secret
  // const { data: usersData, refetch, isLoading, isSuccess } = useGetJSONFileQuery(
  //   `expenses/users/${key}/credentials.json`,
  //   {
  //     skip: shouldSkip, // Skip the API call if the query is not needed
  //   }
  // );

  const links = [
    { label: "Home", to: "/" },
    { label: "Category List", to: "/category-list" },
  ];

  useEffect(() => {
    // Load user credentials from localStorage on initial load
    const storedKey = localStorage.getItem("key");
    const storedSecret = localStorage.getItem("secret");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");

    // If user is authenticated (via localStorage) and has credentials, auto-login
    if (storedIsAuthenticated === "true" && storedKey && storedSecret) {
      dispatch(setUserCredentials({ key: storedKey, secret: storedSecret }));
    }
  }, [dispatch]);

  // const handleUserStatus = () => {
  //   if (usersData?.data) {
  //     console.log(usersData);
  //     console.log(usersData.data.content.includes(secret));
  //     localStorage.setItem("isAuthenticated", "true"); // Mark the user as authenticated
  //   }
  // };



  const handleLogin = () => {
    // Save credentials to localStorage
    localStorage.setItem("key", keyp);   // Save the entered key to localStorage
    localStorage.setItem("secret", secretp); // Save the entered secret to localStorage
    // Dispatch action to update Redux state
    localStorage.setItem("isAuthenticated", "true"); // Mark the user as authenticated

    dispatch(setUserCredentials({ key: keyp, secret: secretp }));

    // Optionally, you can also trigger a status check or API call here
  };


  const logout = () => {
    // Clear credentials from localStorage
    localStorage.removeItem("key");
    localStorage.removeItem("secret");
    localStorage.removeItem("isAuthenticated");

    // Dispatch action to reset the Redux state
    dispatch(setUserCredentials({ key: "", secret: "" }));

    // Optionally: You can also redirect the user after logging out (e.g., to the home page)
    // history.push("/login"); or use a router hook to navigate
  };

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
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.to}
                        className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9" onClick={() => setOpen(true)}>
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>JK</AvatarFallback>
                      <span className="sr-only">Toggle user menu</span>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <FieldSet label="Key" className="w-full">
                        <Input
                          type="text"
                          value={keyp}
                          onChange={(e) => setKeyp(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </FieldSet>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FieldSet label="Secret" className="w-full">
                        <Input
                          type="password"
                          value={secretp}
                          onChange={(e) => setSecretp(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </FieldSet>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogin}>Login</DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
