import type { Metadata } from "next";

import { CatalogView } from "@/components/catalog-view";
import { getAvailableFilters } from "@/lib/api";
import { parseCatalogSearchParams } from "@/lib/catalog";
import { DEFAULT_FILTER_OPTIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Browse, filter, and load more TravelTrucks campers.",
};

export const dynamic = "force-dynamic";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const initialFilters = parseCatalogSearchParams(resolvedSearchParams);

  const filterOptions = await getAvailableFilters().catch(() => DEFAULT_FILTER_OPTIONS);

  return (
    <main className="catalog-page">
      <div className="shell">
        <CatalogView initialFilters={initialFilters} filterOptions={filterOptions} />
      </div>
    </main>
  );
}
