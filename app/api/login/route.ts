import { NextRequest, NextResponse } from "next/server";
import { createSession } from "../../lib/sessions";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // Simulate authentication (replace with real logic)
  if (username === "test" && password === "pass") {
    const sessionId = createSession("user123");
    return NextResponse.json({ success: true, sessionId });
  } else {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 },
    );
  }
}
