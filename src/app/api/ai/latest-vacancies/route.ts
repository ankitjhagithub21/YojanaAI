import { ApiError } from "@google/genai";
import { NextResponse } from "next/server";

import { getGoogleAIClient } from "@/lib/google-ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_TEXT_LENGTH = 500;

type CandidateProfile = {
  age: number;
  state: string;
  gender: string;
  education: string;
  occupation: string;
  category: string;
  additionalInformation: string;
};

type Vacancy = {
  title: string;
  organization: string;
  jobType: string;
  location: string;
  eligibilityReason: string;
  educationRequired: string;
  minimumAge: string;
  maximumAge: string;
  lastDate: string;
  officialWebsite: string;
  notificationLink: string;
  applicationProcess: string[];
  requiredDocuments: string[];
  priorityScore: number;
};

type LatestVacanciesResponse = { vacancies: Vacancy[] };

const latestVacanciesSchema = {
  type: "object",
  additionalProperties: false,
  required: ["vacancies"],
  properties: {
    vacancies: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "title",
          "organization",
          "jobType",
          "location",
          "eligibilityReason",
          "educationRequired",
          "minimumAge",
          "maximumAge",
          "lastDate",
          "officialWebsite",
          "notificationLink",
          "applicationProcess",
          "requiredDocuments",
          "priorityScore",
        ],
        properties: {
          title: { type: "string" },
          organization: { type: "string" },
          jobType: { type: "string" },
          location: { type: "string" },
          eligibilityReason: { type: "string" },
          educationRequired: { type: "string" },
          minimumAge: { type: "string" },
          maximumAge: { type: "string" },
          lastDate: { type: "string" },
          officialWebsite: { type: "string" },
          notificationLink: { type: "string" },
          applicationProcess: { type: "array", items: { type: "string" } },
          requiredDocuments: { type: "array", items: { type: "string" } },
          priorityScore: { type: "integer", minimum: 0, maximum: 100 },
        },
      },
    },
  },
} as const;

const systemPrompt = `You are an expert Indian Government Career Advisor for an India-focused Government Opportunities Finder.

Find only government vacancies that are relevant to the candidate profile. Prioritize the latest, currently active recruitment notifications. Consider Central Government, State Government, PSUs, Banking, Railways, SSC, UPSC, State PSC, Teaching, Defence, Police, and Apprenticeships when relevant.

Use web search to verify that vacancies are current and that notification and application URLs are official. Do not invent vacancies, dates, eligibility, or links. When a detail cannot be verified or may be outdated, state that official notifications must be verified in the relevant string field. Prefer an empty vacancies array to unverified recommendations.

Return only data that conforms to the requested JSON schema. Do not include Markdown, citations, commentary, or fields outside the schema.`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readTextField(input: Record<string, unknown>, field: keyof Omit<CandidateProfile, "age">) {
  const value = input[field];

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${field} must be a non-empty string.`);
  }

  if (value.length > MAX_TEXT_LENGTH) {
    throw new Error(`${field} must not exceed ${MAX_TEXT_LENGTH} characters.`);
  }

  return value.trim();
}

/** Validates untrusted request JSON before it is included in the model input. */
function parseCandidateProfile(payload: unknown): CandidateProfile {
  if (!isRecord(payload)) {
    throw new Error("Request body must be a JSON object.");
  }

  const { age } = payload;

  if (!Number.isInteger(age) || typeof age !== "number" || age < 15 || age > 100) {
    throw new Error("age must be an integer between 15 and 100.");
  }

  return {
    age,
    state: readTextField(payload, "state"),
    gender: readTextField(payload, "gender"),
    education: readTextField(payload, "education"),
    occupation: readTextField(payload, "occupation"),
    category: readTextField(payload, "category"),
    additionalInformation: readTextField(payload, "additionalInformation"),
  };
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * POST /api/ai/latest-vacancies
 *
 * Server-only route that uses the Gemini Interactions API and structured outputs.
 * Additional AI opportunity endpoints can reuse the client and validation patterns here.
 */
export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return errorResponse("Content-Type must be application/json.", 415);
  }

  let profile: CandidateProfile;

  try {
    profile = parseCandidateProfile(await request.json());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid JSON request body.";
    return errorResponse(message, 400);
  }

  try {
    const interaction = await getGoogleAIClient().interactions.create({
      model: "gemini-2.0-flash",
      system_instruction: systemPrompt,
      input: JSON.stringify(profile),
      tools: [{ type: "google_search" }],
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: latestVacanciesSchema,
      },
    });

    if (!interaction.output_text) {
      return errorResponse("The AI service returned no vacancy recommendations.", 502);
    }

    let result: LatestVacanciesResponse;

    try {
      result = JSON.parse(interaction.output_text) as LatestVacanciesResponse;
    } catch {
      console.error("Google AI returned invalid structured output.");
      return errorResponse("The AI service returned an invalid response.", 502);
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("Google AI Studio error", {
        status: error.status,
        message: error.message,
      });

      return errorResponse(
        error.status === 429
          ? "AI service is busy. Please try again shortly."
          : "AI service is temporarily unavailable.",
        error.status === 429 ? 429 : 502,
      );
    }

    if (error instanceof Error && error.message.startsWith("Missing GOOGLE_API_KEY")) {
      console.error(error.message);
      return errorResponse("AI service is not configured.", 500);
    }

    console.error("Unexpected latest-vacancies error", error);
    return errorResponse("Unable to generate vacancy recommendations.", 500);
  }
}
