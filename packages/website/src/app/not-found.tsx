import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-heading text-6xl font-bold text-foreground">404</h1>
      <p className="text-muted">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="text-accent-cyan hover:underline transition-colors duration-200"
      >
        Go home
      </Link>
    </main>
  );
}
