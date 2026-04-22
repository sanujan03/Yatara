
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Welcome from './pages/Welcome';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CustomerLayout from './components/layout/CustomerLayout';
import AdminLayout from './components/layout/AdminLayout';
import MyBookings from './pages/Customer/MyBookings';
import Plans from './pages/Customer/Plans';
import Dashboard from './pages/Admin/Dashboard';
import BookingsManagement from './pages/Admin/BookingsManagement';
import Users from './pages/Admin/Users';
import Vehicles from './pages/Admin/Vehicles';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: { borderRadius: '12px' },
          }}
        />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/customer"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CustomerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="bookings" replace />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="plans" element={<Plans />} />
            <Route
              path="profile"
              element={
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600">
                  Profile module is under development.
                </div>
              }
            />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<BookingsManagement />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="users" element={<Users />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;