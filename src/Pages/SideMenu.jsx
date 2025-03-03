import { Link } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  InboxIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";

// Navigation Items
const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    current: false,
  },
  {
    name: "Manage Universities & Colleges",
    href: "/colleges",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Add Details",
    href: "/add-college",
    icon: FolderIcon,
    current: false,
  },
  {
    name: "Excel Data Upload",
    href: "/upload-excel",
    icon: CalendarIcon,
    current: false,
  },
  {
    name: "Reports & Analytics",
    href: "/reports",
    icon: InboxIcon,
    current: false,
  },
  {
    name: "View Profile",
    href: "/profile",
    icon: ChartBarIcon,
    current: false,
  },
];

// Taken arguments, Removed falsy value, returned in join
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SideMenu = () => {

  return (
    <>
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto bg-indigo-700">
        <div className="flex items-center flex-shrink-0 px-4">
          {/* Logo */}
          <img
            className="h-10 w-10"
            src="https://cdn-icons-png.flaticon.com/128/4345/4345672.png"
            alt="Logo"
          />
        </div>

        <nav className="mt-5 flex-1 px-2 space-y-1">
          {/* Navigation SideMenu */}
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={classNames(
                item.current
                  ? "bg-indigo-800 text-white"
                  : "text-white hover:bg-indigo-600 hover:bg-opacity-75",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              )}
            >
              <item.icon
                className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
    </>
  );
};

export default SideMenu;


//Copilot
