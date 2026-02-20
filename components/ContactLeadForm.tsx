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
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Full name *</span>
          <input
            type="text"
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <span className="text-xs text-red-600">{errors.name}</span> : null}
        </label>

        <label className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Work email *</span>
          <input
            type="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <span className="text-xs text-red-600">{errors.email}</span> : null}
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Role *</span>
          <select
            value={formState.role}
            onChange={(event) => updateField("role", event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            aria-invalid={Boolean(errors.role)}
          >
            <option value="">Select role</option>
            <option value="slp">Speech-language professional</option>
            <option value="caregiver">Caregiver</option>
            <option value="educator">Educator</option>
            <option value="clinical-admin">Clinical administrator</option>
            <option value="other">Other</option>
          </select>
          {errors.role ? <span className="text-xs text-red-600">{errors.role}</span> : null}
        </label>

        <label className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Organization</span>
          <input
            type="text"
            value={formState.organization}
            onChange={(event) => updateField("organization", event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Primary use case *</span>
          <input
            type="text"
            value={formState.primaryUseCase}
            onChange={(event) => updateField("primaryUseCase", event.target.value)}
            placeholder="Example: school rollout, home use, outpatient clinic"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            aria-invalid={Boolean(errors.primaryUseCase)}
          />
          {errors.primaryUseCase ? <span className="text-xs text-red-600">{errors.primaryUseCase}</span> : null}
        </label>

        <label className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Estimated device count</span>
          <input
            type="text"
            value={formState.deviceCount}
            onChange={(event) => updateField("deviceCount", event.target.value)}
            placeholder="Example: 1, 10, 30+"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Desired timeline</span>
          <select
            value={formState.timeline}
            onChange={(event) => updateField("timeline", event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
          >
            <option value="">Select timeline</option>
            <option value="immediate">Immediate (0-2 weeks)</option>
            <option value="short-term">Short term (1-2 months)</option>
            <option value="quarter">This quarter</option>
            <option value="planning">Planning stage</option>
          </select>
        </label>
      </div>

      <label className="space-y-1 text-sm text-slate-700">
        <span className="font-medium">Additional context</span>
        <textarea
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          rows={5}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
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
        {submitted ? <p className="text-sm text-green-700">Inquiry drafted. Please send the opened email to complete submission.</p> : null}
      </div>
    </form>
  );
}
