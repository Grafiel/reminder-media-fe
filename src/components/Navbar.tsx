import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";

const tabs = [
  { name: "BOOKS", to: "/books" },
  { name: "MOVIES", to: "/movies" },
  { name: "SONGS", to: "/songs" },
  { name: "GAMES", to: "/games" },
];

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-blue-600 px-6 py-4 flex justify-between items-center">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.to}
            className={({ isActive }) =>
              classNames(
                isActive ? "text-red-500 font-bold" : "text-white",
                "text-lg hover:text-red-300 transition"
              )
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>

      {/* User Menu */}
      <Menu as="div" className="relative">
        <MenuButton className="rounded-full bg-gray-200 size-8 flex items-center justify-center">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User Avatar"
          />
        </MenuButton>

        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <MenuItem>
            {({ active }) => (
              <NavLink
                to="/profile"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Profile
              </NavLink>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={logout}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block w-full text-left px-4 py-2 text-sm text-gray-700"
                )}
              >
                Sign out
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
    </nav>
  );
};

export default Navbar;
