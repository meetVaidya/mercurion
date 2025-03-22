import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./sessions";

export function withAuth(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const sessionId = req.headers.get("x-session-id");
    const session = sessionId ? getSession(sessionId) : undefined;

    if (!session) {
      return NextResponse.json(
        { authenticated: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    // Attach user info to the request (custom property)
    (req as any).user = { id: session.userId };
    return handler(req);
  };
}
