import { DEFAULT_FILTER_OPTIONS } from "@/lib/constants";
import type { CatalogFilters, CamperForm, EngineType, TransmissionType } from "@/lib/types";

type SearchParamSource =
  | URLSearchParams
  | {
      get(name: string): string | null;
    }
  | Record<string, string | string[] | undefined>;

function hasGetMethod(
  source: SearchParamSource,
): source is URLSearchParams | { get(name: string): string | null } {
  return "get" in source && typeof source.get === "function";
}

const EMPTY_FILTERS: CatalogFilters = {
  location: "",
  form: "",
  transmission: "",
  engine: "",
};

function getParam(source: SearchParamSource, key: string): string | null {
  if (hasGetMethod(source)) {
    return source.get(key);
  }

  const value = source[key];

  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

function validateValue<T extends string>(value: string | null, allowedValues: readonly T[]): T | "" {
  if (value && allowedValues.includes(value as T)) {
    return value as T;
  }

  return "";
}

export function parseCatalogSearchParams(source: SearchParamSource | undefined): CatalogFilters {
  if (!source) {
    return EMPTY_FILTERS;
  }

  return {
    location: getParam(source, "location")?.trim() ?? "",
    form: validateValue<CamperForm>(getParam(source, "form"), DEFAULT_FILTER_OPTIONS.forms),
    transmission: validateValue<TransmissionType>(
      getParam(source, "transmission"),
      DEFAULT_FILTER_OPTIONS.transmissions,
    ),
    engine: validateValue<EngineType>(getParam(source, "engine"), DEFAULT_FILTER_OPTIONS.engines),
  };
}

export function createCatalogQueryString(filters: CatalogFilters): string {
  const params = new URLSearchParams();

  if (filters.location.trim()) {
    params.set("location", filters.location.trim());
  }

  if (filters.form) {
    params.set("form", filters.form);
  }

  if (filters.engine) {
    params.set("engine", filters.engine);
  }

  if (filters.transmission) {
    params.set("transmission", filters.transmission);
  }

  return params.toString();
}

export function getEmptyFilters(): CatalogFilters {
  return { ...EMPTY_FILTERS };
}
