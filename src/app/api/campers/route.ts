import { NextRequest, NextResponse } from "next/server";

import { backendProxyClient } from "@/lib/api";

export async function GET(request: NextRequest) {
  const response = await backendProxyClient.get("/campers", {
    params: Object.fromEntries(request.nextUrl.searchParams.entries()),
    signal: request.signal,
  });

  return NextResponse.json(response.data, {
    status: response.status,
  });
}
