import { useEffect, useState } from 'react';
import API from '../../services/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Table from '../../components/ui/Table';
import { FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';

const BookingsManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get('/bookings');
      setBookings(data);
      setFilteredBookings(data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = bookings;
    if (search) {
      filtered = filtered.filter(
        (b) =>
          b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
          b.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
          b._id.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter !== 'All Statuses') {
      filtered = filtered.filter((b) => b.status === statusFilter.toLowerCase());
    }
    setFilteredBookings(filtered);
  }, [search, statusFilter, bookings]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/bookings/${id}`, { status: newStatus });
      toast.success('Booking updated');
      fetchBookings();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await API.delete(`/bookings/${id}`);
        toast.success('Booking cancelled');
        fetchBookings();
      } catch (error) {
        toast.error('Failed to cancel booking');
      }
    }
  };

  const headers = ['Booking #', 'Customer', 'Package', 'Date', 'Status', 'Actions'];

  const rows = filteredBookings.map((booking) => ({
    cells: [
      <span className="font-mono">#{booking._id.slice(-6)}</span>,
      <div>
        <div className="font-medium text-[#E6F4F1]">{booking.user?.name}</div>
        <div className="text-xs text-[#E6F4F1]/65">{booking.user?.email}</div>
      </div>,
      booking.package?.name || 'Custom',
      new Date(booking.bookingDate).toLocaleDateString(),
      <select
        value={booking.status}
        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
        className={`rounded-full border text-sm px-3 py-1 font-medium shadow-[0_0_16px_rgba(16,185,129,0.12)] ${
          booking.status === 'confirmed'
            ? 'border-green-300 bg-green-100 text-green-800'
            : booking.status === 'pending'
            ? 'border-yellow-300 bg-yellow-100 text-yellow-800'
            : booking.status === 'cancelled'
            ? 'border-red-300 bg-red-100 text-red-800'
            : 'border-blue-300 bg-blue-100 text-blue-800'
        }`}
      >
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="cancelled">Cancelled</option>
        <option value="completed">Completed</option>
      </select>,
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
          View
        </Button>
        <Button variant="danger" size="sm" onClick={() => handleCancel(booking._id)}>
          Cancel
        </Button>
      </div>,
    ],
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-[#F8FFFE]">Bookings Management</h1>
        <p className="text-[#E6F4F1]/75">Search, review, and update booking statuses.</p>
      </div>

      {/* Search and Filter */}
      <div className="glass-surface flex flex-wrap items-center gap-4 rounded-[20px] p-4">
        <div className="flex-1 min-w-[200px]">
          <Input
            icon={FiSearch}
            placeholder="Search by name, email, or booking #"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-[20px] border border-[#10B981]/30 bg-[#052E2B]/55 px-4 py-2 text-[#E6F4F1] shadow-[0_0_18px_rgba(16,185,129,0.12)] backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#10B981]/35"
        >
          <option className="bg-[#052E2B] text-[#E6F4F1]">All Statuses</option>
          <option className="bg-[#052E2B] text-[#E6F4F1]">Pending</option>
          <option className="bg-[#052E2B] text-[#E6F4F1]">Confirmed</option>
          <option className="bg-[#052E2B] text-[#E6F4F1]">Cancelled</option>
          <option className="bg-[#052E2B] text-[#E6F4F1]">Completed</option>
        </select>
      </div>

      {loading ? (
        <div className="glass-surface rounded-[20px] p-6 text-[#E6F4F1]/75">Loading bookings...</div>
      ) : filteredBookings.length === 0 ? (
        <div className="glass-surface rounded-[20px] p-12 text-center">
          <h2 className="mb-2 text-2xl font-semibold text-[#E6F4F1]">No bookings found</h2>
          <p className="text-[#E6F4F1]/70">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
        </div>
      ) : (
        <Table headers={headers} rows={rows} />
      )}

      {selectedBooking && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/45 p-4">
          <div className="glass-surface w-full max-w-2xl rounded-[20px] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#E6F4F1]">Booking #{selectedBooking._id.slice(-6)}</h2>
              <Button variant="outline" size="sm" onClick={() => setSelectedBooking(null)}>
                Close
              </Button>
            </div>
            <div className="grid gap-3 text-sm text-[#E6F4F1]/85 md:grid-cols-2">
              <p><strong>Customer:</strong> {selectedBooking.user?.name || 'N/A'}</p>
              <p><strong>Email:</strong> {selectedBooking.user?.email || 'N/A'}</p>
              <p><strong>Package:</strong> {selectedBooking.package?.name || 'Custom'}</p>
              <p><strong>Package Price:</strong> {selectedBooking.package?.price ? `LKR ${selectedBooking.package.price}` : 'N/A'}</p>
              <p><strong>Vehicle:</strong> {selectedBooking.vehicle?.model || 'No preference'}</p>
              <p><strong>Vehicle Reg #:</strong> {selectedBooking.vehicle?.registrationNumber || 'N/A'}</p>
              <p><strong>Start Date:</strong> {selectedBooking.bookingDate ? new Date(selectedBooking.bookingDate).toLocaleDateString() : 'N/A'}</p>
              <p><strong>End Date:</strong> {selectedBooking.endDate ? new Date(selectedBooking.endDate).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Pickup Location:</strong> {selectedBooking.pickupLocation || 'N/A'}</p>
              <p><strong>Destination:</strong> {selectedBooking.destination || 'N/A'}</p>
              <p><strong>People (PAX):</strong> {selectedBooking.numberOfPeople || 'N/A'}</p>
              <p><strong>Total Price:</strong> {selectedBooking.totalPrice ? `LKR ${selectedBooking.totalPrice}` : 'N/A'}</p>
              <p><strong>Status:</strong> {selectedBooking.status}</p>
              <p><strong>Created At:</strong> {selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toLocaleString() : 'N/A'}</p>
              <p className="md:col-span-2 break-words"><strong>Special Requests:</strong> {selectedBooking.specialRequests || 'None'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsManagement;