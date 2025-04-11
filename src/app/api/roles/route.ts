import { NextRequest, NextResponse } from "next/server";
import { getAllRoles, createRole } from "@/server/role/api";

export async function GET(req: NextRequest) {
  try {
    const roles = await getAllRoles();
    return NextResponse.json({ _metadata: { success: true }, result: roles });
  } catch (error) {
    console.error("❌ Failed to fetch roles:", error);
    return NextResponse.json({ _metadata: { success: false }, error: "Failed to fetch roles" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = await createRole(body);
    return NextResponse.json({ _metadata: { success: true }, result: created });
  } catch (error) {
    console.error("❌ Failed to create role:", error);
    return NextResponse.json({ _metadata: { success: false }, error: "Failed to create role" }, { status: 400 });
  }
}
