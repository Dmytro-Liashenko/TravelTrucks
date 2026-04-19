export type CamperForm = "alcove" | "panel_van" | "integrated" | "semi_integrated";
export type TransmissionType = "automatic" | "manual";
export type EngineType = "diesel" | "petrol" | "hybrid" | "electric";
export type Amenity =
  | "ac"
  | "bathroom"
  | "kitchen"
  | "tv"
  | "radio"
  | "refrigerator"
  | "microwave"
  | "gas"
  | "water";

export interface CatalogFilters {
  location: string;
  form: CamperForm | "";
  transmission: TransmissionType | "";
  engine: EngineType | "";
}

export interface CamperListItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: TransmissionType;
  engine: EngineType;
  amenities: Amenity[];
  coverImage: string;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface CamperListResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperListItem[];
}

export interface FiltersResponse {
  forms: CamperForm[];
  transmissions: TransmissionType[];
  engines: EngineType[];
}

export interface CamperImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface CamperDetails extends Omit<CamperListItem, "coverImage"> {
  gallery: CamperImage[];
}

export interface CamperReview {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export interface BookingRequestPayload {
  name: string;
  email: string;
}

export interface BookingRequestResponse {
  message: string;
}

export interface CampersQuery extends CatalogFilters {
  page: number;
  perPage: number;
}
