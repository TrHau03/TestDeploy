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

// ✅ GET
export async function GET(_req: NextApiRequest) {
  try {
    const permission = await getPermissionById(Number(_req.query.id));
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
export async function PUT(_req: NextApiRequest) {
  try {
    const body = await _req.body.json();
    const updated = await updatePermission(Number(_req.query.id), body);
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
export async function DELETE(_req: NextApiRequest) {
  try {
    const result = await deletePermission(Number(_req.query.id));
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
