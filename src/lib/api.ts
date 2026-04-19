import axios, { AxiosError, type AxiosInstance } from "axios";

import type {
  BookingRequestPayload,
  BookingRequestResponse,
  CamperDetails,
  CamperListResponse,
  CamperReview,
  CampersQuery,
  FiltersResponse,
} from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://campers-api.goit.study";
const DEFAULT_HEADERS = {
  Accept: "application/json",
};

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export function getApiBaseUrl(): string {
  return API_BASE_URL;
}

function createApiClient(baseURL: string): AxiosInstance {
  const client = axios.create({
    baseURL,
    headers: DEFAULT_HEADERS,
  });

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(toApiError(error)),
  );

  return client;
}

export const backendApiClient = createApiClient(API_BASE_URL);
export const frontendApiClient = createApiClient("/api");
export const backendProxyClient = axios.create({
  baseURL: API_BASE_URL,
  headers: DEFAULT_HEADERS,
  validateStatus: () => true,
});

function extractErrorMessage(error: AxiosError<{ message?: string }>): string {
  const responseMessage = error.response?.data?.message;

  if (typeof responseMessage === "string" && responseMessage.trim()) {
    return responseMessage;
  }

  if (error.message.trim()) {
    return error.message;
  }

  return "Request failed";
}

export function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return new ApiError(
      extractErrorMessage(error),
      error.response?.status ?? 500,
      error.response?.data,
    );
  }

  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    return new ApiError(error.message, 500);
  }

  return new ApiError("Request failed", 500);
}

export function isApiErrorStatus(error: unknown, status: number): boolean {
  return error instanceof ApiError && error.status === status;
}

export function buildCampersSearchParams(query: CampersQuery): Record<string, number | string> {
  const params: Record<string, number | string> = {
    page: query.page,
    perPage: query.perPage,
  };

  if (query.location.trim()) {
    params.location = query.location.trim();
  }

  if (query.form) {
    params.form = query.form;
  }

  if (query.engine) {
    params.engine = query.engine;
  }

  if (query.transmission) {
    params.transmission = query.transmission;
  }

  return params;
}

export async function getAvailableFilters(): Promise<FiltersResponse> {
  const { data } = await backendApiClient.get<FiltersResponse>("/campers/filters");
  return data;
}

export async function getCamperById(camperId: string): Promise<CamperDetails> {
  const { data } = await backendApiClient.get<CamperDetails>(`/campers/${camperId}`);
  return data;
}

export async function getCamperReviews(camperId: string): Promise<CamperReview[]> {
  const { data } = await backendApiClient.get<CamperReview[]>(`/campers/${camperId}/reviews`);
  return data;
}

export async function getCampersPage(query: CampersQuery, signal?: AbortSignal): Promise<CamperListResponse> {
  const params = buildCampersSearchParams(query);
  const { data } = await frontendApiClient.get<CamperListResponse>("/campers", {
    params,
    signal,
  });
  return data;
}

export async function createBookingRequest(
  camperId: string,
  payload: BookingRequestPayload,
  signal?: AbortSignal,
): Promise<BookingRequestResponse> {
  const { data } = await frontendApiClient.post<BookingRequestResponse>(
    `/campers/${camperId}/booking-requests`,
    payload,
    {
      signal,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return data;
}
