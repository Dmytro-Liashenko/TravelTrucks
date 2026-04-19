export function LoadingCards({ count = 4 }: { count?: number }) {
  return (
    <div className="cards-list" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div className="camper-card camper-card--skeleton" key={index}>
          <div className="skeleton skeleton__image" />
          <div className="camper-card__content">
            <div className="skeleton skeleton__line skeleton__line--title" />
            <div className="skeleton skeleton__line skeleton__line--meta" />
            <div className="skeleton skeleton__line" />
            <div className="skeleton skeleton__line skeleton__line--short" />
            <div className="camper-card__chips">
              <span className="skeleton skeleton__chip" />
              <span className="skeleton skeleton__chip" />
              <span className="skeleton skeleton__chip" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
