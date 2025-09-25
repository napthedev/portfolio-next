import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h2 className="text-2xl mb-4">404 - Page Not Found</h2>
      <p className="mb-4">Could not find the requested resource.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Return Home
      </Link>
    </div>
  );
}
