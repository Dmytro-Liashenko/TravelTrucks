import Link from "next/link";

export default function NotFound() {
  return (
    <main className="centered-page">
      <div className="shell">
        <div className="empty-state empty-state--centered">
          <h1>Camper not found</h1>
          <p>The requested camper does not exist or is no longer available.</p>
          <Link href="/catalog" className="button">
            Go to catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
