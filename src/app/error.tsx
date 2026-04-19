"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="centered-page">
          <div className="shell">
            <div className="empty-state empty-state--centered">
              <h1>Something went wrong</h1>
              <p>{error.message || "Please reload the page and try again."}</p>
              <button type="button" className="button" onClick={() => reset()}>
                Try again
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
