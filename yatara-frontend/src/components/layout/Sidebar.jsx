
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiHome, FiBook, FiTruck, FiUsers, FiLogOut, FiMap } from 'react-icons/fi';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const isAdminLike = user?.role === 'admin' || user?.role === 'staff';

  const customerLinks = [
    { to: '/customer/bookings', label: 'My Bookings', icon: FiBook },
    { to: '/customer/plans', label: 'My Plans', icon: FiMap },
    { to: '/customer/profile', label: 'Profile', icon: FiUsers },
  ];

  const adminLinks = [
    { to: '/admin', label: 'Dashboard', icon: FiHome },
    { to: '/admin/bookings', label: 'Bookings', icon: FiBook },
    { to: '/admin/vehicles', label: 'Vehicles', icon: FiTruck },
    { to: '/admin/users', label: 'Users', icon: FiUsers },
  ];

  const links = isAdminLike ? adminLinks : customerLinks;

  return (
    <aside className="glass-sidebar fixed bottom-0 left-0 right-0 z-30 border-t border-[#10B981]/30 md:top-3 md:bottom-3 md:left-3 md:w-64 md:border md:border-r md:border-t">
      <div className="hidden border-b border-[#10B981]/25 px-6 py-5 md:block">
        <h1 className="text-2xl font-bold tracking-tight text-[#E6F4F1]">Yatara</h1>
        <p className="text-sm text-[#E6F4F1]/70">{isAdminLike ? 'Admin / Staff' : 'Customer'}</p>
      </div>
      <nav className="grid grid-cols-4 gap-1 p-2 md:block md:px-3 md:py-5">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-[20px] px-2 py-2 text-xs transition md:mb-1 md:flex-row md:gap-3 md:px-4 md:py-3 md:text-sm ${
                isActive
                  ? 'bg-[#10B981]/25 text-[#E6F4F1] shadow-[0_0_22px_rgba(16,185,129,0.25)]'
                  : 'text-[#E6F4F1]/80 hover:bg-[#10B981]/15 hover:text-[#E6F4F1]'
              }`
            }
          >
            <link.icon className="text-lg" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="hidden border-t border-[#10B981]/25 p-3 md:block">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-[20px] px-4 py-3 text-left text-[#E6F4F1] transition hover:bg-[#10B981]/14"
        >
          <FiLogOut />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;