import { LoadingCards } from "@/components/loading-cards";

export default function CatalogLoading() {
  return (
    <main className="catalog-page">
      <div className="shell catalog-layout">
        <aside className="filter-panel">
          <div className="skeleton skeleton__panel" />
        </aside>
        <LoadingCards />
      </div>
    </main>
  );
}
