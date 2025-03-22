interface Session {
  userId: string;
}

const sessions: Record<string, Session> = {};

export function createSession(userId: string): string {
  const sessionId = Math.random().toString(36).substring(2);
  sessions[sessionId] = { userId };
  return sessionId;
}

export function getSession(sessionId: string): Session | undefined {
  return sessions[sessionId];
}
