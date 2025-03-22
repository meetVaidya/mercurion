import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../lib/sessions";

export async function GET(req: NextRequest) {
  const sessionId = req.headers.get("x-session-id");
  const session = sessionId ? getSession(sessionId) : undefined;

  if (session) {
    return NextResponse.json({ authenticated: true });
  } else {
    return NextResponse.json({ authenticated: false });
  }
}
