
import { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { FiCalendar, FiUsers } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get('/bookings/mybookings');
      setBookings(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load your bookings right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const getHoursUntilBooking = (bookingDate) => {
    const diffMs = new Date(bookingDate).getTime() - Date.now();
    return diffMs / (1000 * 60 * 60);
  };

  const canShowEdit = (booking) => {
    const hoursUntilBooking = getHoursUntilBooking(booking.bookingDate);
    return booking.status === 'pending' && hoursUntilBooking > 12;
  };

  const canShowCancel = (booking) => booking.status === 'pending' || booking.status === 'confirmed';

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await API.put(`/bookings/${bookingId}`, { status: 'cancelled' });
      toast.success('Booking cancelled');
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to cancel booking');
    }
  };

  const handleEdit = (booking) => {
    navigate(`/customer/plans?editBooking=${booking._id}`, {
      state: { booking },
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#F8FFFE]">My Bookings</h1>
        <p className="text-[#E6F4F1]/75">Track your travel inquiries and reservations.</p>
      </div>

      {loading ? (
        <div className="glass-surface rounded-[20px] p-8 text-[#E6F4F1]/75">Loading bookings...</div>
      ) : error ? (
        <div className="rounded-[20px] border border-red-500/45 bg-red-500/10 p-6 text-red-200">{error}</div>
      ) : bookings.length === 0 ? (
        <div className="glass-surface rounded-[20px] p-12 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-[#E6F4F1]">No Bookings Yet</h2>
          <p className="mb-6 text-[#E6F4F1]/70">
            Browse our luxury packages and start your Sri Lankan adventure.
          </p>
          <Link
            to="/customer/plans"
            className="inline-block rounded-[20px] border border-[#10B981]/45 bg-[#064E3B]/70 px-6 py-3 text-[#E6F4F1] shadow-[0_0_22px_rgba(16,185,129,0.22)] transition hover:bg-[#064E3B]/95"
          >
            Explore Packages
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {bookings.map((booking) => (
            <div key={booking._id} className="glass-surface flex flex-col justify-between gap-5 rounded-[20px] p-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-[#E6F4F1]/65">Booking #{booking._id.slice(-6)}</p>
                <h3 className="text-lg font-semibold text-[#E6F4F1]">{booking.package?.name || 'Custom Plan'}</h3>
                <div className="mt-2 flex items-center gap-4 text-sm text-[#E6F4F1]/75">
                  <span className="flex items-center gap-1"><FiCalendar /> {new Date(booking.bookingDate).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><FiUsers /> {booking.numberOfPeople} pax</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {booking.status.toUpperCase()}
                </span>
                <p className="mt-2 font-bold text-[#E6F4F1]">LKR {booking.totalPrice || 0}</p>
                <div className="mt-3 flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => setSelectedBooking(booking)}>
                    View
                  </Button>
                </div>
                {(canShowEdit(booking) || canShowCancel(booking)) && (
                  <div className="mt-3 flex justify-end gap-2">
                    {canShowEdit(booking) && (
                      <Button size="sm" variant="outline" onClick={() => handleEdit(booking)}>
                        Edit
                      </Button>
                    )}
                    {canShowCancel(booking) && (
                      <Button size="sm" variant="danger" onClick={() => handleCancel(booking._id)}>
                        Cancel
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBooking && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/45 p-4">
          <div className="glass-surface w-full max-w-2xl rounded-[20px] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#E6F4F1]">Booking Details #{selectedBooking._id.slice(-6)}</h2>
              <Button size="sm" variant="outline" onClick={() => setSelectedBooking(null)}>
                Close
              </Button>
            </div>

            <div className="grid gap-3 text-sm text-[#E6F4F1]/85 md:grid-cols-2">
              <p><strong>Package:</strong> {selectedBooking.package?.name || 'Custom Plan'}</p>
              <p><strong>Vehicle:</strong> {selectedBooking.vehicle?.model || 'No preference'}</p>
              <p><strong>Start Date:</strong> {selectedBooking.bookingDate ? new Date(selectedBooking.bookingDate).toLocaleDateString() : 'N/A'}</p>
              <p><strong>End Date:</strong> {selectedBooking.endDate ? new Date(selectedBooking.endDate).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Pickup Location:</strong> {selectedBooking.pickupLocation || 'N/A'}</p>
              <p><strong>Destination:</strong> {selectedBooking.destination || 'N/A'}</p>
              <p><strong>Number of People:</strong> {selectedBooking.numberOfPeople || 'N/A'}</p>
              <p><strong>Status:</strong> {String(selectedBooking.status || '').toUpperCase()}</p>
              <p><strong>Total Price:</strong> LKR {selectedBooking.totalPrice || 0}</p>
              <p><strong>Created:</strong> {selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toLocaleString() : 'N/A'}</p>
              <div className="md:col-span-2">
                <p><strong>Special Requests:</strong> {selectedBooking.specialRequests || 'None'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;