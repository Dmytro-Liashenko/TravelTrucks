"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiOutlineMapPin } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";

import { CamperCard } from "@/components/camper-card";
import { LoadingCards } from "@/components/loading-cards";
import { createCatalogQueryString, getEmptyFilters, parseCatalogSearchParams } from "@/lib/catalog";
import { getCampersPage } from "@/lib/api";
import { ENGINE_LABELS, FORM_LABELS, TRANSMISSION_LABELS } from "@/lib/constants";
import type { CatalogFilters, FiltersResponse } from "@/lib/types";

const ITEMS_PER_PAGE = 4;

interface CatalogViewProps {
  initialFilters: CatalogFilters;
  filterOptions: FiltersResponse;
}

interface CatalogFiltersFormProps {
  initialFilters: CatalogFilters;
  filterOptions: FiltersResponse;
  isRouting: boolean;
  onApply: (nextFilters: CatalogFilters) => void;
}

function CatalogFiltersForm({
  initialFilters,
  filterOptions,
  isRouting,
  onApply,
}: CatalogFiltersFormProps) {
  const [draftFilters, setDraftFilters] = useState<CatalogFilters>(initialFilters);

  function updateFilter<K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) {
    setDraftFilters((currentState) => ({
      ...currentState,
      [key]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onApply(draftFilters);
  }

  function handleReset() {
    const emptyFilters = getEmptyFilters();
    setDraftFilters(emptyFilters);
    onApply(emptyFilters);
  }

  return (
    <form onSubmit={handleSubmit} className="filter-panel__form">
      <div className="filter-panel__group">
        <label className="field-label" htmlFor="location">
          Location
        </label>
        <div className="input-shell">
          <HiOutlineMapPin className="input-shell__icon" />
          <input
            id="location"
            name="location"
            className="text-input"
            placeholder="Kyiv, Ukraine"
            value={draftFilters.location}
            onChange={(event) => updateFilter("location", event.target.value)}
          />
        </div>
      </div>

      <div className="filter-panel__section">
        <p className="filter-panel__eyebrow">Filters</p>

        <fieldset className="filter-group">
          <legend className="filter-group__title">Camper form</legend>
          <div className="radio-list">
            {filterOptions.forms.map((form) => (
              <label key={form} className="radio-card">
                <input
                  type="radio"
                  name="form"
                  value={form}
                  checked={draftFilters.form === form}
                  onChange={() => updateFilter("form", form)}
                />
                <span>{FORM_LABELS[form]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="filter-group">
          <legend className="filter-group__title">Engine</legend>
          <div className="radio-list">
            {filterOptions.engines.map((engine) => (
              <label key={engine} className="radio-card">
                <input
                  type="radio"
                  name="engine"
                  value={engine}
                  checked={draftFilters.engine === engine}
                  onChange={() => updateFilter("engine", engine)}
                />
                <span>{ENGINE_LABELS[engine]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="filter-group">
          <legend className="filter-group__title">Transmission</legend>
          <div className="radio-list">
            {filterOptions.transmissions.map((transmission) => (
              <label key={transmission} className="radio-card">
                <input
                  type="radio"
                  name="transmission"
                  value={transmission}
                  checked={draftFilters.transmission === transmission}
                  onChange={() => updateFilter("transmission", transmission)}
                />
                <span>{TRANSMISSION_LABELS[transmission]}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="filter-panel__actions">
        <button type="submit" className="button" disabled={isRouting}>
          {isRouting ? "Searching..." : "Search"}
        </button>
        <button type="button" className="button button--ghost button--with-icon" onClick={handleReset}>
          <IoCloseOutline className="button__icon" />
          Clear filters
        </button>
      </div>
    </form>
  );
}

export function CatalogView({ initialFilters, filterOptions }: CatalogViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const appliedFilters = parseCatalogSearchParams(searchParams);
  const [isRouting, startRoutingTransition] = useTransition();

  const campersQuery = useInfiniteQuery({
    queryKey: ["campers", searchKey],
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) =>
      getCampersPage(
        {
          ...appliedFilters,
          page: pageParam,
          perPage: ITEMS_PER_PAGE,
        },
        signal,
      ),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const campers = campersQuery.data?.pages.flatMap((page) => page.campers) ?? [];
  const hasResults = campers.length > 0;
  const isLoading = campersQuery.isPending || isRouting;

  function applyFilters(nextFilters: CatalogFilters) {
    const queryString = createCatalogQueryString(nextFilters);
    const nextSearchKey = queryString;

    if (nextSearchKey === searchKey) {
      return;
    }

    startRoutingTransition(() => {
      router.push(queryString ? `/catalog?${queryString}` : "/catalog", { scroll: false });
    });
  }

  return (
    <div className="catalog-layout">
      <aside className="filter-panel">
        <CatalogFiltersForm
          key={searchKey || "empty"}
          initialFilters={initialFilters}
          filterOptions={filterOptions}
          isRouting={isRouting}
          onApply={applyFilters}
        />
      </aside>

      <section className="catalog-results" aria-live="polite">
        {isLoading ? <LoadingCards /> : null}

        {!isLoading && campersQuery.isError ? (
          <div className="empty-state">
            <h2>We couldn&apos;t load campers right now</h2>
            <p>Try again in a moment or adjust your filters.</p>
          </div>
        ) : null}

        {!isLoading && !campersQuery.isError && !hasResults ? (
          <div className="empty-state">
            <h2>No campers matched your filters</h2>
            <p>Try another city or reset the current filter combination.</p>
          </div>
        ) : null}

        {!isLoading && hasResults ? (
          <>
            <div className="cards-list">
              {campers.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
            </div>

            {campersQuery.hasNextPage ? (
              <button
                type="button"
                className="button button--outline load-more-button"
                onClick={() => campersQuery.fetchNextPage()}
                disabled={campersQuery.isFetchingNextPage}
              >
                {campersQuery.isFetchingNextPage ? "Loading..." : "Load more"}
              </button>
            ) : null}
          </>
        ) : null}
      </section>
    </div>
  );
}
