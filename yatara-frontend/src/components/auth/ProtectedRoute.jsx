
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#ECFDF5]">
        <div className="rounded-2xl bg-white px-6 py-4 text-slate-600 shadow-sm">
          Loading your dashboard...
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/signin" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;