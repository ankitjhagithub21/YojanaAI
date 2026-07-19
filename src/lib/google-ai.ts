import "server-only";

import { GoogleGenAI } from "@google/genai";

declare global {
  var googleAIClient: GoogleGenAI | undefined;
}

/**
 * Returns one server-only Google AI Studio client. The API key is read only at
 * runtime so builds do not require a configured secret.
 */
export function getGoogleAIClient() {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing GOOGLE_API_KEY. Add it to your server environment before using AI features.",
    );
  }

  globalThis.googleAIClient ??= new GoogleGenAI({ apiKey });

  return globalThis.googleAIClient;
}
