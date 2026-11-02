import React from "react";
import { Check, Sparkles } from "lucide-react";

const templates = [
  {
    id: "classic",
    name: "Classic",
    badge: "ATS Optimal",
    description: "Refined traditional layout with structured serif/sans harmony."
  },
  {
    id: "modern",
    name: "Modern",
    badge: "High Impact",
    description: "Bold header banner, avatar initials, and dynamic timeline."
  },
  {
    id: "compact",
    name: "Compact",
    badge: "Density First",
    description: "Two-column grid maximizing data volume without clutter."
  }
];

export default function TemplateSelector({ value, onChange }) {
  return (
    <div className="sakshima-template-selector">
      <div className="selector-label">
        <Sparkles size={13} className="text-electric" />
        <span>Select Blueprint Architecture</span>
      </div>

      <div className="template-grid">
        {templates.map((tpl) => {
          const isSelected = value === tpl.id;
          return (
            <button
              key={tpl.id}
              className={`template-card-btn ${isSelected ? "selected" : ""}`}
              onClick={() => onChange(tpl.id)}
              type="button"
              aria-pressed={isSelected}
            >
              {/* Mini Blueprint Visualizer */}
              <div className={`mini-blueprint-art blueprint-${tpl.id}`}>
                <div className="blueprint-header-bar" />
                <div className="blueprint-lines">
                  <span className="b-line b-w80" />
                  <span className="b-line b-w60" />
                  <span className="b-line b-w90" />
                  <span className="b-line b-w40" />
                </div>
                {isSelected && (
                  <div className="blueprint-check-tag">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </div>

              <div className="template-info">
                <div className="template-title-row">
                  <span className="template-name">{tpl.name}</span>
                  <span className="template-badge">{tpl.badge}</span>
                </div>
                <span className="template-desc">{tpl.description}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
