import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fffaf7] px-6">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-[#6B0B0C]">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-[#2D120D]">
          Page not found
        </h2>

        <p className="mt-2 text-sm text-[#2D120D]/50">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-[#6B0B0C] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2D120D]"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;