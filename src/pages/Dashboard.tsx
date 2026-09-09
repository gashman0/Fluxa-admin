import { useLogout } from "../network/auth/queries";

const Dashboard = () => {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isPending}
          className="mt-6 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Logging out..." : "Log Out"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;