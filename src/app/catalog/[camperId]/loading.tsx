export default function CamperDetailsLoading() {
  return (
    <main className="details-page">
      <div className="shell">
        <div className="details-top">
          <div className="skeleton skeleton__gallery" />
          <div className="details-stack">
            <div className="skeleton skeleton__card" />
            <div className="skeleton skeleton__card" />
          </div>
        </div>
        <div className="details-bottom">
          <div className="skeleton skeleton__column" />
          <div className="skeleton skeleton__column skeleton__column--short" />
        </div>
      </div>
    </main>
  );
}
