"use client";

import { useState } from "react";
import { Photo } from "@/components/photo";
import { services, faqs } from "@/content/site";

export function ServiceList() {
  const [open, setOpen] = useState<string | null>(services[0]?.number ?? null);
  return (
    <div>
      {services.map((service) => {
        const expanded = open === service.number;
        return (
          <div key={service.number} className="border-t border-line">
            <button
              type="button"
              className="flex w-full items-center gap-4 py-6 text-left"
              aria-expanded={expanded}
              aria-controls={`service-${service.number}`}
              onClick={() => setOpen(expanded ? null : service.number)}
            >
              <span className="w-10 text-[12px] font-medium tracking-[0.02em] text-muted">{service.number}</span>
              <span className="flex-1 text-[56px] leading-none font-bold tracking-[-0.05em] max-[809px]:text-[32px]">
                {service.title}
              </span>
              <span aria-hidden="true" className="relative size-4">
                <span className="absolute top-1/2 left-0 h-px w-4 bg-ink" />
                <span
                  className={`absolute top-0 left-1/2 h-4 w-px bg-ink transition-transform ${expanded ? "scale-y-0" : ""}`}
                />
              </span>
            </button>
            {expanded ? (
              <div id={`service-${service.number}`} className="grid gap-4 pb-8 pl-14 max-[809px]:pl-0">
                <div className="relative h-[220px] overflow-hidden rounded-xl">
                  <Photo name={service.image} alt={service.title} sizes="(min-width: 1200px) 900px, 100vw" />
                </div>
                <p className="max-w-[640px] text-[15px] leading-[1.5] text-muted">{service.body}</p>
              </div>
            ) : null}
          </div>
        );
      })}
      <div className="border-t border-line" />
    </div>
  );
}

export function FaqList() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {faqs.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question} className="border-t border-line">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-6 text-left text-[18px]"
              aria-expanded={expanded}
              aria-controls={`faq-${index}`}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span>{item.question}</span>
              <span aria-hidden="true" className="text-[20px]">
                {expanded ? "×" : "+"}
              </span>
            </button>
            {expanded ? (
              <p id={`faq-${index}`} className="max-w-[640px] pb-6 text-[15px] leading-[1.5] text-muted">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
      <div className="border-t border-line" />
    </div>
  );
}
