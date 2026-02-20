"use client";

import { FormEvent, useMemo, useState } from "react";
import { siteConfig } from "@/lib/site";

type LeadFormState = {
  name: string;
  email: string;
  role: string;
  organization: string;
  primaryUseCase: string;
  deviceCount: string;
  timeline: string;
  message: string;
};

type FormErrors = Partial<Record<keyof LeadFormState, string>>;

const initialState: LeadFormState = {
  name: "",
  email: "",
  role: "",
  organization: "",
  primaryUseCase: "",
  deviceCount: "",
  timeline: "",
  message: "",
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactLeadForm() {
  const [formState, setFormState] = useState<LeadFormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const requiredFields: Array<keyof LeadFormState> = useMemo(() => ["name", "email", "role", "primaryUseCase"], []);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    for (const field of requiredFields) {
      if (!formState[field].trim()) {
        nextErrors[field] = "This field is required.";
      }
    }

    if (formState.email && !isValidEmail(formState.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    const subject = `VoiceBridge AAC inquiry: ${formState.primaryUseCase}`;
    const bodyLines = [
      `Name: ${formState.name}`,
      `Email: ${formState.email}`,
      `Role: ${formState.role}`,
      `Organization: ${formState.organization || "Not provided"}`,
      `Primary use case: ${formState.primaryUseCase}`,
      `Device count: ${formState.deviceCount || "Not provided"}`,
      `Timeline: ${formState.timeline || "Not provided"}`,
      "",
      "Message:",
      formState.message || "No additional notes provided.",
    ];

    const mailto = `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join("\n"),
    )}`;

    setSubmitted(true);
    window.location.href = mailto;
  };

  const updateField = (field: keyof LeadFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label htmlFor="lead-name" className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Full name *</span>
          <input
            id="lead-name"
            type="text"
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="field-control"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "lead-name-error" : undefined}
            autoComplete="name"
            required
          />
          {errors.name ? (
            <span id="lead-name-error" className="text-xs text-red-600">
              {errors.name}
            </span>
          ) : null}
        </label>

        <label htmlFor="lead-email" className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Work email *</span>
          <input
            id="lead-email"
            type="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="field-control"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "lead-email-error" : undefined}
            autoComplete="email"
            required
          />
          {errors.email ? (
            <span id="lead-email-error" className="text-xs text-red-600">
              {errors.email}
            </span>
          ) : null}
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label htmlFor="lead-role" className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Role *</span>
          <select
            id="lead-role"
            value={formState.role}
            onChange={(event) => updateField("role", event.target.value)}
            className="field-control"
            aria-invalid={Boolean(errors.role)}
            aria-describedby={errors.role ? "lead-role-error" : undefined}
            required
          >
            <option value="">Select role</option>
            <option value="slp">Speech-language professional</option>
            <option value="caregiver">Caregiver</option>
            <option value="educator">Educator</option>
            <option value="clinical-admin">Clinical administrator</option>
            <option value="other">Other</option>
          </select>
          {errors.role ? (
            <span id="lead-role-error" className="text-xs text-red-600">
              {errors.role}
            </span>
          ) : null}
        </label>

        <label htmlFor="lead-organization" className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Organization</span>
          <input
            id="lead-organization"
            type="text"
            value={formState.organization}
            onChange={(event) => updateField("organization", event.target.value)}
            className="field-control"
            autoComplete="organization"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label htmlFor="lead-use-case" className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Primary use case *</span>
          <input
            id="lead-use-case"
            type="text"
            value={formState.primaryUseCase}
            onChange={(event) => updateField("primaryUseCase", event.target.value)}
            placeholder="Example: school rollout, home use, outpatient clinic"
            className="field-control"
            aria-invalid={Boolean(errors.primaryUseCase)}
            aria-describedby={errors.primaryUseCase ? "lead-use-case-error" : undefined}
            required
          />
          {errors.primaryUseCase ? (
            <span id="lead-use-case-error" className="text-xs text-red-600">
              {errors.primaryUseCase}
            </span>
          ) : null}
        </label>

        <label htmlFor="lead-device-count" className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Estimated device count</span>
          <input
            id="lead-device-count"
            type="text"
            value={formState.deviceCount}
            onChange={(event) => updateField("deviceCount", event.target.value)}
            placeholder="Example: 1, 10, 30+"
            className="field-control"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label htmlFor="lead-timeline" className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Desired timeline</span>
          <select
            id="lead-timeline"
            value={formState.timeline}
            onChange={(event) => updateField("timeline", event.target.value)}
            className="field-control"
          >
            <option value="">Select timeline</option>
            <option value="immediate">Immediate (0-2 weeks)</option>
            <option value="short-term">Short term (1-2 months)</option>
            <option value="quarter">This quarter</option>
            <option value="planning">Planning stage</option>
          </select>
        </label>
      </div>

      <label htmlFor="lead-message" className="space-y-1 text-sm text-slate-700">
        <span className="font-medium">Additional context</span>
        <textarea
          id="lead-message"
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          rows={5}
          className="field-control"
          placeholder="Share communication goals, workflows, or constraints."
        />
      </label>

      <div className="space-y-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
        >
          Submit inquiry
        </button>
        <p className="text-xs text-slate-500">
          This form opens your email client with pre-filled details. If it does not open, email {siteConfig.supportEmail}.
        </p>
        {submitted ? (
          <p aria-live="polite" className="text-sm text-green-700">
            Inquiry drafted. Please send the opened email to complete submission.
          </p>
        ) : null}
      </div>
    </form>
  );
}
