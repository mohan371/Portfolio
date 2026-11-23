"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { playTactileClick } from "@/lib/sound";
import { studioFaqs } from "@/content/data/studio";
import { ChevronDown, HelpCircle } from "lucide-react";

export function StudioFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Engagement", "Technical", "Delivery", "Pricing"];

  const filteredFaqs = studioFaqs.filter(
    (f) => selectedCategory === "All" || f.category === selectedCategory
  );

  const toggleItem = (idx: number) => {
    playTactileClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-6">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playTactileClick();
              setSelectedCategory(cat);
              setOpenIndex(null);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground font-bold shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-surface-2"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <Card
              key={idx}
              hasDatumCorners
              className={`border transition-all ${
                isOpen ? "border-primary/40 bg-surface shadow-xs" : "border-border bg-card shadow-subtle"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="cyan" className="text-[10px] uppercase font-mono">
                    {faq.category}
                  </Badge>
                  <h4 className="font-display font-bold text-base text-foreground">
                    {faq.question}
                  </h4>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-primary transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-muted-foreground font-light leading-relaxed border-t border-border mt-1">
                  <p className="p-3.5 rounded-xl bg-surface-secondary font-sans text-xs text-foreground/90 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
