import type { JobSearchFormValues, LatestVacanciesResponse } from "@/types/job";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Calls the server-only vacancy recommendation route from the browser UI. */
export async function findLatestVacancies(
  profile: JobSearchFormValues,
): Promise<LatestVacanciesResponse> {
  const response = await fetch("/api/ai/latest-vacancies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...profile,
      // The current API requires this field. Keep it optional in the user experience.
      additionalInformation:
        profile.additionalInformation?.trim() || "No additional information provided.",
    }),
  });

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof body === "object" && body !== null && "error" in body && typeof body.error === "string"
        ? body.error
        : "Unable to find vacancies right now. Please try again.";

    throw new ApiError(message, response.status);
  }

  if (!isLatestVacanciesResponse(body)) {
    throw new ApiError("The server returned an unexpected response.", 502);
  }

  return body;
}

function isLatestVacanciesResponse(value: unknown): value is LatestVacanciesResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "vacancies" in value &&
    Array.isArray(value.vacancies)
  );
}
