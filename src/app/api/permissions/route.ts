// ✅ apps/admin/src/app/api/permissions/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getAllPermissions, createPermission } from "@/server/permissions/api";

export async function GET(req: NextRequest) {
  try {
    const permissions = await getAllPermissions();
    return NextResponse.json({ _metadata: { success: true }, result: { permissions } });
  } catch (error) {
    console.error("❌ Failed to fetch permissions:", error);
    return NextResponse.json(
      { _metadata: { success: false }, error: "Failed to fetch permissions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = await createPermission(body);
    return NextResponse.json({ _metadata: { success: true }, result: created });
  } catch (error) {
    console.error("❌ Failed to create permission:", error);
    return NextResponse.json(
      { _metadata: { success: false }, error: "Failed to create permission" },
      { status: 400 }
    );
  }
}
