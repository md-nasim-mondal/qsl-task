import Link from "next/link";
import Container from "@/components/shared/Container";

export const metadata = {
  title: "Page Not Found | QuickHire"
};

export default function NotFound() {
  return (
    <Container className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-text-dark mb-4">404</h1>
      <h2 className="text-2xl font-bold text-text-dark mb-4">Page Not Found</h2>
      <p className="text-text-body mb-8 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link 
        href="/"
        className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors"
      >
        Go Back Home
      </Link>
    </Container>
  );
}
