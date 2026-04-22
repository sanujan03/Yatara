
import { useEffect, useState } from 'react';
import API from '../../services/api';
import Card from '../../components/ui/Card';
import { FiBook, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import Table from '../../components/ui/Table';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
  });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/bookings');
        const total = data.length;
        const pending = data.filter((b) => b.status === 'pending').length;
        const confirmed = data.filter((b) => b.status === 'confirmed').length;
        const cancelled = data.filter((b) => b.status === 'cancelled').length;
        setStats({ total, pending, confirmed, cancelled });
        setRecent(data.slice(0, 6));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Bookings', value: stats.total, icon: FiBook, color: 'bg-blue-500' },
    { label: 'Pending', value: stats.pending, icon: FiClock, color: 'bg-yellow-500' },
    { label: 'Confirmed', value: stats.confirmed, icon: FiCheckCircle, color: 'bg-green-500' },
    { label: 'Cancelled', value: stats.cancelled, icon: FiXCircle, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FFFE]">Dashboard</h1>
        <p className="text-[#E6F4F1]/70">Real-time snapshot of booking activity.</p>
      </div>
      {loading ? (
        <div className="glass-surface rounded-[20px] p-6 text-[#E6F4F1]/70">Loading dashboard...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => (
              <Card key={stat.label} className="flex items-center gap-4">
                <div className={`${stat.color} flex h-12 w-12 items-center justify-center rounded-[20px] text-white shadow-[0_0_24px_rgba(16,185,129,0.18)]`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#E6F4F1]/65">{stat.label}</p>
                  <p className="text-2xl font-semibold text-[#E6F4F1]">{stat.value}</p>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <h2 className="mb-4 text-xl font-semibold text-[#E6F4F1]">Recent Bookings</h2>
            <Table
              headers={['Booking', 'Customer', 'Date', 'Status']}
              rows={recent.map((b) => ({
                cells: [
                  `#${b._id.slice(-6)}`,
                  b.user?.name || 'N/A',
                  new Date(b.bookingDate).toLocaleDateString(),
                  <span className="rounded-full border border-[#10B981]/30 bg-[#10B981]/16 px-3 py-1 text-xs font-semibold uppercase text-[#E6F4F1]">{b.status}</span>,
                ],
              }))}
            />
          </Card>
        </>
      )}
    </div>
  );
};

export default Dashboard;