import type { Amenity, CamperForm, EngineType, FiltersResponse, TransmissionType } from "@/lib/types";

export const FORM_OPTIONS: Array<{ value: CamperForm; label: string }> = [
  { value: "alcove", label: "Alcove" },
  { value: "panel_van", label: "Panel Van" },
  { value: "integrated", label: "Integrated" },
  { value: "semi_integrated", label: "Semi Integrated" },
];

export const ENGINE_OPTIONS: Array<{ value: EngineType; label: string }> = [
  { value: "diesel", label: "Diesel" },
  { value: "petrol", label: "Petrol" },
  { value: "hybrid", label: "Hybrid" },
  { value: "electric", label: "Electric" },
];

export const TRANSMISSION_OPTIONS: Array<{ value: TransmissionType; label: string }> = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
];

export const DEFAULT_FILTER_OPTIONS: FiltersResponse = {
  forms: FORM_OPTIONS.map((option) => option.value),
  transmissions: TRANSMISSION_OPTIONS.map((option) => option.value),
  engines: ENGINE_OPTIONS.map((option) => option.value),
};

export const FORM_LABELS: Record<CamperForm, string> = Object.fromEntries(
  FORM_OPTIONS.map((option) => [option.value, option.label]),
) as Record<CamperForm, string>;

export const ENGINE_LABELS: Record<EngineType, string> = Object.fromEntries(
  ENGINE_OPTIONS.map((option) => [option.value, option.label]),
) as Record<EngineType, string>;

export const TRANSMISSION_LABELS: Record<TransmissionType, string> = Object.fromEntries(
  TRANSMISSION_OPTIONS.map((option) => [option.value, option.label]),
) as Record<TransmissionType, string>;

export const AMENITY_LABELS: Record<Amenity, string> = {
  ac: "AC",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  tv: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};
