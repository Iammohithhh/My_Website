import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-prose">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-4">
        This page doesn&apos;t exist or has moved. Try the{" "}
        <Link href="/" className="link">
          homepage
        </Link>{" "}
        or the{" "}
        <Link href="/#research" className="link">
          research page
        </Link>
        .
      </p>
    </div>
  );
}
