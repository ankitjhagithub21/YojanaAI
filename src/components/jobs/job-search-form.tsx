"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { JobSearchFormValues } from "@/types/job";

const jobSearchSchema = z.object({
  age: z.coerce.number().int("Enter a whole number.").min(15, "Age must be at least 15.").max(100),
  gender: z.string().min(1, "Select your gender."),
  state: z.string().trim().min(2, "Enter your state."),
  education: z.string().trim().min(2, "Enter your highest education."),
  occupation: z.string().trim().min(2, "Enter your occupation."),
  category: z.string().min(1, "Select your category."),
  additionalInformation: z.string().trim().max(500, "Use 500 characters or fewer.").optional(),
});

type JobSearchFormProps = {
  isSubmitting: boolean;
  onSubmit: (values: JobSearchFormValues) => Promise<void>;
};

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-destructive text-sm">{message}</p> : null;
}

export function JobSearchForm({ isSubmitting, onSubmit }: JobSearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.input<typeof jobSearchSchema>, unknown, JobSearchFormValues>({
    resolver: zodResolver(jobSearchSchema),
    defaultValues: {
      age: 23,
      gender: "",
      state: "",
      education: "",
      occupation: "Student",
      category: "",
      additionalInformation: "",
    },
  });

  return (
    <Card className="p-5 sm:p-6">
      <form className="space-y-5" noValidate onSubmit={handleSubmit((values) => onSubmit(values))}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              inputMode="numeric"
              min="15"
              max="100"
              type="number"
              {...register("age")}
            />
            <FieldError message={errors.age?.message} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <select
              className="border-input bg-background focus-visible:ring-ring h-10 w-full rounded-md border px-3 text-sm shadow-sm outline-none focus-visible:ring-2"
              id="gender"
              {...register("gender")}
            >
              <option value="">Select gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            <FieldError message={errors.gender?.message} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <select
              className="border-input bg-background focus-visible:ring-ring h-10 w-full rounded-md border px-3 text-sm shadow-sm outline-none focus-visible:ring-2"
              id="state"
              {...register("state")}
            >
              <option value="">Select state</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <FieldError message={errors.state?.message} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="education">Highest education</Label>
            <Input
              id="education"
              placeholder="e.g. MCA, B.Tech, Class 12"
              {...register("education")}
            />
            <FieldError message={errors.education?.message} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input
              id="occupation"
              placeholder="e.g. Student, Professional"
              {...register("occupation")}
            />
            <FieldError message={errors.occupation?.message} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              className="border-input bg-background focus-visible:ring-ring h-10 w-full rounded-md border px-3 text-sm shadow-sm outline-none focus-visible:ring-2"
              id="category"
              {...register("category")}
            >
              <option value="">Select category</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
            <FieldError message={errors.category?.message} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="additionalInformation">
            Additional information{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Textarea
            id="additionalInformation"
            maxLength={500}
            placeholder="Mention exams, certifications, preferences, or experience that may help us match you."
            {...register("additionalInformation")}
          />
          <FieldError message={errors.additionalInformation?.message} />
        </div>
        <Button className="w-full sm:w-auto" disabled={isSubmitting} size="lg" type="submit">
          <Search aria-hidden="true" />
          {isSubmitting ? "Finding opportunities..." : "Find matching vacancies"}
        </Button>
      </form>
    </Card>
  );
}
