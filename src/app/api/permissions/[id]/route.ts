import { NextRequest, NextResponse } from "next/server";
import {
  getPermissionById,
  updatePermission,
  deletePermission,
} from "@/server/permissions/api";
import { NextApiRequest } from "next";

// type RouteContext = {
//   params: {
//     id: string;
//   };
// };
type Context = {
  params: {
    id: string;
  };
};
// ✅ GET
export async function GET(_req: NextRequest, context:any) {
  try {
    const permission = await getPermissionById(Number(context.params.id));
    return NextResponse.json({
      _metadata: { success: true },
      result: { permission },
    });
  } catch (error) {
    console.error("❌ Failed to fetch permission:", error);
    return NextResponse.json(
      { _metadata: { success: false }, error: "Failed to fetch permission" },
      { status: 404 }
    );
  }
}

// ✅ PUT
export async function PUT(_req: NextRequest, context: any) {
  try {
    const body = await _req.json();
    const updated = await updatePermission(Number(context.params.id), body);
    return NextResponse.json({
      _metadata: { success: true },
      result: updated,
    });
  } catch (error) {
    console.error("❌ Failed to update permission:", error);
    return NextResponse.json(
      { _metadata: { success: false }, error: "Failed to update permission" },
      { status: 400 }
    );
  }
}

// ✅ DELETE
export async function DELETE(_req: NextRequest, context: any) {
  try {
    const result = await deletePermission(Number(context.params.id));
    return NextResponse.json({
      _metadata: { success: true },
      result,
    });
  } catch (error) {
    console.error("❌ Failed to delete permission:", error);
    return NextResponse.json(
      { _metadata: { success: false }, error: "Failed to delete permission" },
      { status: 400 }
    );
  }
}
