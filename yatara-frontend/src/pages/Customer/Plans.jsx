import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import API from '../../services/api';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const LOCAL_PACKAGES = [
  {
    _id: 'local-sigiriya',
    name: 'Sigiriya Heritage Escape',
    destination: 'Sigiriya',
    duration: 2,
    price: 18000,
    isLocal: true,
  },
  {
    _id: 'local-kandy',
    name: 'Kandy Cultural Journey',
    destination: 'Kandy',
    duration: 3,
    price: 15000,
    isLocal: true,
  },
  {
    _id: 'local-ella',
    name: 'Ella Hill Country Tour',
    destination: 'Ella',
    duration: 3,
    price: 22000,
    isLocal: true,
  },
  {
    _id: 'local-galle',
    name: 'Galle Fort Coastal Retreat',
    destination: 'Galle',
    duration: 2,
    price: 16500,
    isLocal: true,
  },
  {
    _id: 'local-nuwara-eliya',
    name: 'Nuwara Eliya Tea Country Stay',
    destination: 'Nuwara Eliya',
    duration: 3,
    price: 20500,
    isLocal: true,
  },
  {
    _id: 'local-yala',
    name: 'Yala Wildlife Adventure',
    destination: 'Yala',
    duration: 2,
    price: 24000,
    isLocal: true,
  },
  {
    _id: 'local-bentota',
    name: 'Bentota Beach Break',
    destination: 'Bentota',
    duration: 2,
    price: 17000,
    isLocal: true,
  },
  {
    _id: 'local-trincomalee',
    name: 'Trincomalee Ocean Discovery',
    destination: 'Trincomalee',
    duration: 3,
    price: 23000,
    isLocal: true,
  },
  {
    _id: 'local-anuradhapura',
    name: 'Anuradhapura Sacred City Tour',
    destination: 'Anuradhapura',
    duration: 2,
    price: 16000,
    isLocal: true,
  },
  {
    _id: 'local-mirissa',
    name: 'Mirissa Whale Coast Experience',
    destination: 'Mirissa',
    duration: 2,
    price: 19500,
    isLocal: true,
  },
  {
    _id: 'local-arugam-bay',
    name: 'Arugam Bay Surf Escape',
    destination: 'Arugam Bay',
    duration: 3,
    price: 22500,
    isLocal: true,
  },
];

const LOCAL_VEHICLES = [
  { _id: 'local-car', model: 'Toyota Axio', type: 'Car', capacity: 3, isLocal: true },
  { _id: 'local-van', model: 'KDH Hiace', type: 'Van', capacity: 8, isLocal: true },
  { _id: 'local-suv', model: 'Toyota Prado', type: 'SUV', capacity: 6, isLocal: true },
  { _id: 'local-premio', model: 'Toyota Premio', type: 'Car', capacity: 4, isLocal: true },
  { _id: 'local-prius', model: 'Toyota Prius', type: 'Car', capacity: 4, isLocal: true },
  { _id: 'local-benz', model: 'Mercedes C200', type: 'Car', capacity: 4, isLocal: true },
  { _id: 'local-coaster', model: 'Toyota Coaster', type: 'Bus', capacity: 20, isLocal: true },
  { _id: 'local-spacia', model: 'Nissan Caravan', type: 'Van', capacity: 10, isLocal: true },
  { _id: 'local-montero', model: 'Mitsubishi Montero', type: 'SUV', capacity: 7, isLocal: true },
  { _id: 'local-v8', model: 'Toyota Land Cruiser V8', type: 'SUV', capacity: 7, isLocal: true },
];

const isMongoObjectId = (value) => /^[a-f\d]{24}$/i.test(String(value || ''));

const getPackageDurationLabel = (pkg) => {
  if (!pkg?.duration || Number(pkg.duration) <= 0) return 'Custom duration';
  const days = Number(pkg.duration);
  const nights = days > 1 ? days - 1 : 0;
  return `${days}D / ${nights}N`;
};

const getVehicleType = (vehicle) => {
  if (vehicle?.type) return vehicle.type;
  const model = String(vehicle?.model || '').toLowerCase();
  const capacity = Number(vehicle?.capacity || 0);
  if (model.includes('suv')) return 'SUV';
  if (model.includes('van') || capacity >= 7) return 'Van';
  return 'Car';
};

const getTodayDateString = () => {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - timezoneOffset).toISOString().slice(0, 10);
};

const Plans = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const editBookingId = searchParams.get('editBooking');
  const bookingFromState = location.state?.booking;

  const [packages, setPackages] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    packageId: '',
    vehicleId: '',
    numberOfPeople: 1,
    startDate: '',
    endDate: '',
    pickupLocation: '',
    destination: '',
    specialRequests: '',
  });

  const todayDate = useMemo(() => getTodayDateString(), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packageRes, vehicleRes] = await Promise.all([
          API.get('/packages'),
          API.get('/vehicles'),
        ]);
        const packageData = packageRes.data || [];
        const vehicleData = vehicleRes.data || [];
        setPackages([...packageData, ...LOCAL_PACKAGES]);
        setVehicles([...vehicleData, ...LOCAL_VEHICLES]);
      } catch (error) {
        setPackages(LOCAL_PACKAGES);
        setVehicles(LOCAL_VEHICLES);
        toast.error(error.response?.data?.message || 'Loaded local form data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!editBookingId) return;

    const hydrateFromBooking = (booking) => {
      const packageId = booking?.package?._id || booking?.package || '';
      const vehicleId = booking?.vehicle?._id || booking?.vehicle || '';

      setFormData((prev) => ({
        ...prev,
        packageId,
        vehicleId,
        numberOfPeople: booking?.numberOfPeople || 1,
        startDate: booking?.bookingDate ? new Date(booking.bookingDate).toISOString().slice(0, 10) : '',
        endDate: booking?.endDate ? new Date(booking.endDate).toISOString().slice(0, 10) : '',
        pickupLocation: booking?.pickupLocation || '',
        destination: booking?.destination || '',
        specialRequests: booking?.specialRequests || '',
      }));
      setIsEditMode(true);
    };

    if (bookingFromState?._id === editBookingId) {
      hydrateFromBooking(bookingFromState);
      return;
    }

    const fetchBookingForEdit = async () => {
      try {
        const { data } = await API.get(`/bookings/${editBookingId}`);
        hydrateFromBooking(data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Unable to load booking for editing');
      }
    };

    fetchBookingForEdit();
  }, [editBookingId, bookingFromState]);

  const selectedPackage = useMemo(
    () => packages.find((p) => p._id === formData.packageId),
    [packages, formData.packageId]
  );

  const calculatedPrice = useMemo(() => {
    if (!selectedPackage) return 0;
    return Number(selectedPackage.price || 0) * Number(formData.numberOfPeople || 0);
  }, [selectedPackage, formData.numberOfPeople]);

  useEffect(() => {
    if (selectedPackage?.destination && !formData.destination) {
      setFormData((prev) => ({ ...prev, destination: selectedPackage.destination }));
    }
  }, [selectedPackage, formData.destination]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.packageId) return toast.error('Please select a package');
    if (!formData.numberOfPeople || Number(formData.numberOfPeople) < 1) {
      return toast.error('Number of people must be at least 1');
    }
    if (!formData.startDate) return toast.error('Please select a start date');
    if (formData.startDate < todayDate) {
      return toast.error('Booking start date cannot be in the past');
    }
    if (!formData.endDate) return toast.error('Please select an end date');
    if (formData.endDate < formData.startDate) {
      return toast.error('End date cannot be earlier than start date');
    }
    if (!formData.pickupLocation.trim()) return toast.error('Please enter pickup location');
    if (!formData.destination.trim()) return toast.error('Please enter destination');

    setSubmitting(true);
    try {
      const selectedVehicle = vehicles.find((v) => v._id === formData.vehicleId);
      const packageValue = isMongoObjectId(formData.packageId) ? formData.packageId : undefined;
      const vehicleValue = isMongoObjectId(formData.vehicleId) ? formData.vehicleId : undefined;

      const localNotes = [
        selectedPackage && !packageValue ? `Package: ${selectedPackage.name}` : '',
        selectedVehicle && !vehicleValue ? `Vehicle: ${selectedVehicle.model}` : '',
      ]
        .filter(Boolean)
        .join(' | ');

      const payload = {
        package: packageValue,
        vehicle: vehicleValue,
        bookingDate: formData.startDate,
        endDate: formData.endDate,
        pickupLocation: formData.pickupLocation,
        destination: formData.destination,
        numberOfPeople: Number(formData.numberOfPeople),
        specialRequests: [localNotes, formData.specialRequests].filter(Boolean).join(' | '),
        totalPrice: calculatedPrice,
      };

      if (isEditMode && editBookingId) {
        await API.put(`/bookings/${editBookingId}`, payload);
        toast.success('Booking updated successfully');
        navigate('/customer/bookings');
      } else {
        await API.post('/bookings', payload);
        toast.success('Booking request submitted successfully');
        setFormData({
          packageId: '',
          vehicleId: '',
          numberOfPeople: 1,
          startDate: '',
          endDate: '',
          pickupLocation: '',
          destination: '',
          specialRequests: '',
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-surface rounded-[20px] p-8 text-[#E6F4F1]/75">Loading booking form...</div>
    );
  }

  const selectStyles = 'w-full rounded-[20px] border border-[#10B981]/30 bg-[#052E2B]/55 px-3 py-2.5 text-[#E6F4F1] shadow-[0_0_18px_rgba(16,185,129,0.12)] backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#10B981]/35';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FFFE]">Plan Your Trip</h1>
        {isEditMode && editBookingId && (
          <span className="mt-2 inline-flex rounded-full border border-[#10B981]/40 bg-[#10B981]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#E6F4F1]">
            Editing Booking #{editBookingId.slice(-6)}
          </span>
        )}
        <p className="text-[#E6F4F1]/75">
          {isEditMode
            ? 'Update your booking details and save your changes.'
            : 'Fill all details and submit your booking request.'}
        </p>
      </div>

      <Card>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#E6F4F1]/90">Package Selection</label>
              <select
                name="packageId"
                value={formData.packageId}
                onChange={handleChange}
                className={selectStyles}
                required
              >
                <option value="" className="bg-[#052E2B] text-[#E6F4F1]">Select a package</option>
                {packages.map((pkg) => (
                  <option key={pkg._id} value={pkg._id} className="bg-[#052E2B] text-[#E6F4F1]">
                    {pkg.name} ({getPackageDurationLabel(pkg)}) - LKR {pkg.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#E6F4F1]/90">Vehicle Type (Optional)</label>
              <select
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleChange}
                className={selectStyles}
              >
                <option value="" className="bg-[#052E2B] text-[#E6F4F1]">No preference</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle._id} className="bg-[#052E2B] text-[#E6F4F1]">
                    [{getVehicleType(vehicle)}] {vehicle.model} ({vehicle.capacity || 'N/A'} seats)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#E6F4F1]/90">Number of People (PAX)</label>
              <select
                name="numberOfPeople"
                value={formData.numberOfPeople}
                onChange={handleChange}
                className={selectStyles}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((pax) => (
                  <option key={pax} value={pax} className="bg-[#052E2B] text-[#E6F4F1]">
                    {pax}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Pickup Location"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
            />

            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              min={todayDate}
              required
            />

            <Input
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate || todayDate}
              required
            />

            <Input
              label="Destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />

            <div>
              <label className="mb-1 block text-sm font-medium text-[#E6F4F1]/90">Estimated Total</label>
              <div className="rounded-[20px] border border-[#10B981]/30 bg-[#052E2B]/55 px-3 py-2.5 text-[#E6F4F1] shadow-[0_0_18px_rgba(16,185,129,0.12)] backdrop-blur">
                LKR {calculatedPrice.toLocaleString()}
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#E6F4F1]/90">Special Requests (Optional)</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-[20px] border border-[#10B981]/30 bg-[#052E2B]/55 px-3 py-2.5 text-[#E6F4F1] shadow-[0_0_18px_rgba(16,185,129,0.12)] backdrop-blur placeholder:text-[#E6F4F1]/55 focus:outline-none focus:ring-2 focus:ring-[#10B981]/35"
              placeholder="Any custom requests..."
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" isLoading={submitting}>
              {isEditMode ? 'Save Changes' : 'Submit Booking'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Plans;
