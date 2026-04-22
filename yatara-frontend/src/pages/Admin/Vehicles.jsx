import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Vehicles = () => {
  const sampleVehicles = [
    { id: 'V001', model: 'Toyota Axio', type: 'Car', seats: 3, available: true },
    { id: 'V002', model: 'KDH Hiace', type: 'Van', seats: 8, available: true },
    { id: 'V003', model: 'Toyota Prado', type: 'SUV', seats: 6, available: true },
    { id: 'V004', model: 'Toyota Premio', type: 'Car', seats: 4, available: true },
    { id: 'V005', model: 'Toyota Prius', type: 'Car', seats: 4, available: false },
    { id: 'V006', model: 'Mercedes C200', type: 'Car', seats: 4, available: true },
    { id: 'V007', model: 'Toyota Coaster', type: 'Bus', seats: 20, available: true },
    { id: 'V008', model: 'Nissan Caravan', type: 'Van', seats: 10, available: false },
    { id: 'V009', model: 'Mitsubishi Montero', type: 'SUV', seats: 7, available: true },
    { id: 'V010', model: 'Toyota Land Cruiser V8', type: 'SUV', seats: 7, available: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F8FFFE]">Vehicles</h1>
          <p className="text-[#E6F4F1]/75">Fleet management UI is prepared for API wiring.</p>
        </div>
        <Button variant="secondary">Add Vehicle</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sampleVehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#E6F4F1]/65">{vehicle.id}</p>
                <h3 className="text-lg font-semibold text-[#E6F4F1]">{vehicle.model}</h3>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  vehicle.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {vehicle.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <p className="text-sm text-[#E6F4F1]/75">Type: {vehicle.type}</p>
            <p className="text-sm text-[#E6F4F1]/75">Capacity: {vehicle.seats} seats</p>
            <div className="mt-5 flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="danger" size="sm">Delete</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="mb-3 text-xl font-semibold text-[#E6F4F1]">Backend Integration Note</h2>
        <p className="text-[#E6F4F1]/75">
          The vehicles UI is ready. Add `/vehicles` CRUD endpoints in backend to enable live fleet operations.
        </p>
      </Card>
    </div>
  );
};

export default Vehicles;