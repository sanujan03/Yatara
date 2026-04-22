import Card from '../../components/ui/Card';

const Users = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FFFE]">Users</h1>
        <p className="text-[#E6F4F1]/75">User management panel is ready for backend integration.</p>
      </div>

      <Card>
        <h2 className="mb-3 text-xl font-semibold text-[#E6F4F1]">Module Status</h2>
        <p className="text-[#E6F4F1]/75">
          This page UI is completed. To enable live data, add backend endpoints for users list and role updates,
          then connect them in this view.
        </p>
      </Card>

      <Card>
        <h3 className="mb-3 text-lg font-semibold text-[#E6F4F1]">Planned Features</h3>
        <ul className="list-disc space-y-2 pl-5 text-[#E6F4F1]/75">
          <li>Search users by name, email, and role</li>
          <li>Change role with audit trail</li>
          <li>Account activation and deactivation</li>
        </ul>
      </Card>
    </div>
  );
};

export default Users;