import { AMENITY_LABELS, ENGINE_LABELS, FORM_LABELS, TRANSMISSION_LABELS } from "@/lib/constants";
import type { Amenity, CamperForm, EngineType, TransmissionType } from "@/lib/types";

export function formatPrice(price: number): string {
  return `€${price}`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function formatLocation(location: string): string {
  const parts = location.split(",").map((part) => part.trim()).filter(Boolean);

  if (parts.length === 2) {
    return `${parts[1]}, ${parts[0]}`;
  }

  return location;
}

export function formatForm(value: CamperForm): string {
  return FORM_LABELS[value];
}

export function formatEngine(value: EngineType): string {
  return ENGINE_LABELS[value];
}

export function formatTransmission(value: TransmissionType): string {
  return TRANSMISSION_LABELS[value];
}

export function formatAmenity(value: Amenity): string {
  return AMENITY_LABELS[value];
}
