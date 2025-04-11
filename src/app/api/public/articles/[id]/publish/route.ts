import { NextRequest, NextResponse } from "next/server";
import { HTTPEndpointDynamic } from "@/core/constants/endpoints";
import http from "@/server/integration/http";
import { PublishArticleResponseSchema } from "@/server/article/_internal/schema";
import * as v from "valibot";

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  try {
    const raw = await http
      .post(HTTPEndpointDynamic.PUBLISH_ARTICLE(Number(context.params.id)))
      .json();
    const response = v.parse(PublishArticleResponseSchema, raw);

    return NextResponse.json({ _metadata: { success: true }, result: response.result });
  } catch (error) {
    console.error("❌ Failed to publish article:", error);
    return NextResponse.json(
      { _metadata: { success: false }, error: "Failed to publish article" },
      { status: 400 }
    );
  }
}
