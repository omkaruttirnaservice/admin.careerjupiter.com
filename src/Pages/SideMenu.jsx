import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { useState } from 'react';
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  InboxIcon,
  ChartBarIcon,
  XIcon,
  MenuIcon,
} from '@heroicons/react/outline';


const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Manage Universities & Colleges', href: '/colleges', icon: UsersIcon, current: false },
  { name: 'Add Details', href: '/add-college', icon: FolderIcon, current: false },
  { name: 'Excel Data Upload', href: '/upload-excel', icon: CalendarIcon, current: false },
  { name: 'Reports & Analytics', href: '/reports', icon: InboxIcon, current: false },
  { name: 'View Profile', href: '/profile', icon: ChartBarIcon, current: false },
  { name: 'Courses', href: '/collegeCourses', icon: ChartBarIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SideMenu = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-indigo-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                alt="Logo"
              />
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} to={item.href} className={classNames(
                    item.current
                      ? 'bg-indigo-800 text-white'
                      : 'text-white hover:bg-indigo-600 hover:bg-opacity-75',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )}>
                  <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;

