export type JobSearchFormValues = {
  age: number;
  gender: string;
  state: string;
  education: string;
  occupation: string;
  category: string;
  additionalInformation?: string;
};

export type Job = {
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

export type LatestVacanciesResponse = {
  vacancies: Job[];
};
