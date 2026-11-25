"use client";

import { useState } from "react";
import { company } from "@/data/site";
import { Icons } from "./icons";

export function EnquiryForm({ defaultPart = "" }: { defaultPart?: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company")}`,
      `Phone: ${data.get("phone")}`,
      `Forklift brand / model: ${data.get("brand")}`,
      "",
      `${data.get("message")}`,
    ].join("\n");
    window.location.href = `mailto:${company.emails[0]}?subject=${encodeURIComponent(
      "Spare part enquiry",
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "peer w-full rounded-md border border-white/12 bg-white/[0.04] px-4 pt-6 pb-2 text-white outline-none transition-colors placeholder:text-transparent focus:border-brand focus:bg-white/[0.06]";
  const label =
    "pointer-events-none absolute top-4 left-4 text-sm text-white/45 transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-brand peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]";

  const inputs = [
    { name: "name", label: "Your name", required: true },
    { name: "company", label: "Company" },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "brand", label: "Forklift brand / model" },
  ];

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      {inputs.map((f) => (
        <label key={f.name} className="relative block">
          <input name={f.name} type={f.type ?? "text"} required={f.required} placeholder={f.label} className={field} />
          <span className={label}>
            {f.label}
            {f.required && " *"}
          </span>
        </label>
      ))}
      <label className="relative block sm:col-span-2">
        <textarea
          name="message"
          rows={4}
          required
          defaultValue={defaultPart}
          placeholder="Which part do you need?"
          className={`${field} resize-none`}
        />
        <span className={label}>Which part do you need? Add part numbers if you have them. *</span>
      </label>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn-primary group">
          Send enquiry
          <Icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <p className="text-xs text-white/40">Opens your email app with the details filled in.</p>
      </div>
      {sent && (
        <p className="fade-up text-sm text-white/60 sm:col-span-2" role="status">
          Your email app should open with the enquiry filled in. If it doesn&apos;t, call us at {company.phones[0]}.
        </p>
      )}
    </form>
  );
}
