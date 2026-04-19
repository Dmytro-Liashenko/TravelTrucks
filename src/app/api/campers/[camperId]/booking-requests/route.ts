import { NextRequest, NextResponse } from "next/server";

import { backendProxyClient } from "@/lib/api";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ camperId: string }> },
) {
  const { camperId } = await params;
  const body = (await request.json()) as unknown;

  const response = await backendProxyClient.post(`/campers/${camperId}/booking-requests`, body, {
    signal: request.signal,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json(response.data, {
    status: response.status,
  });
}
