import React from "react";
import { Plus, Trash2, User, GraduationCap, Briefcase, FolderGit2, Award, Wrench, ShieldCheck } from "lucide-react";

function Field({ label, value, onChange, placeholder, type = "text", wide = false, rows, icon: Icon }) {
  return (
    <label className={`sakshima-field ${wide ? "field-wide" : ""}`}>
      <span className="field-label-text">
        {Icon && <Icon size={12} className="field-icon" />}
        {label}
      </span>
      {rows ? (
        <textarea
          rows={rows}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="sakshima-input sakshima-textarea"
        />
      ) : (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="sakshima-input"
        />
      )}
    </label>
  );
}

function RepeatGroup({ title, icon: GroupIcon, items, fields, onChange, onAdd, onRemove, addLabel, stepNum }) {
  return (
    <section className="form-group-card">
      <div className="group-card-header">
        <div className="group-title-wrap">
          <span className="group-step-pill">{stepNum}</span>
          <div className="group-title-text">
            <h3>
              {GroupIcon && <GroupIcon size={16} className="text-electric" />}
              {title}
            </h3>
            <span className="group-count-badge">{items.length} {items.length === 1 ? "entry" : "entries"}</span>
          </div>
        </div>
        <button type="button" className="btn-add-item" onClick={onAdd}>
          <Plus size={14} /> {addLabel}
        </button>
      </div>

      <div className="group-items-list">
        {items.map((item, index) => (
          <div className="repeat-item-card" key={item.id}>
            <div className="repeat-item-topbar">
              <span className="repeat-item-index">
                {title.slice(0, -1)} #{index + 1}
              </span>
              {items.length > 1 && (
                <button
                  className="btn-remove-item"
                  onClick={() => onRemove(item.id)}
                  type="button"
                  aria-label={`Remove ${title.slice(0, -1)} ${index + 1}`}
                >
                  <Trash2 size={14} /> Remove
                </button>
              )}
            </div>
            <div className="fields-grid">
              {fields.map((field) => (
                <Field
                  key={field.key}
                  {...field}
                  value={item[field.key]}
                  onChange={(val) => onChange(item.id, field.key, val)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function FormSection({ resume, setResume }) {
  const update = (key, value) => setResume((old) => ({ ...old, [key]: value }));
  const updateList = (list, id, key, value) =>
    setResume((old) => ({
      ...old,
      [list]: old[list].map((item) => (item.id === id ? { ...item, [key]: value } : item))
    }));
  const add = (list, prefix, defaults) =>
    setResume((old) => ({
      ...old,
      [list]: [...old[list], { id: `${prefix}-${Date.now()}`, ...defaults }]
    }));
  const remove = (list, id) =>
    setResume((old) => ({
      ...old,
      [list]: old[list].filter((item) => item.id !== id)
    }));

  return (
    <div className="sakshima-form-wrapper">
      {/* 01: Personal Details */}
      <section className="form-group-card">
        <div className="group-card-header">
          <div className="group-title-wrap">
            <span className="group-step-pill">01</span>
            <div className="group-title-text">
              <h3>
                <User size={16} className="text-electric" />
                Personal & Identity Details
              </h3>
              <span className="group-subtitle">Core contact information and career positioning</span>
            </div>
          </div>
        </div>

        <div className="fields-grid">
          <Field
            label="Full Name"
            value={resume.fullName}
            onChange={(v) => update("fullName", v)}
            placeholder="e.g. Alex Morgan"
          />
          <Field
            label="Professional Title"
            value={resume.role}
            onChange={(v) => update("role", v)}
            placeholder="e.g. Full Stack Systems Engineer"
          />
          <Field
            label="Email Address"
            type="email"
            value={resume.email}
            onChange={(v) => update("email", v)}
            placeholder="e.g. alex@sakshima.dev"
          />
          <Field
            label="Phone Number"
            value={resume.phone}
            onChange={(v) => update("phone", v)}
            placeholder="e.g. +1 555 010 2040"
          />
          <Field
            label="Location"
            value={resume.location}
            onChange={(v) => update("location", v)}
            placeholder="e.g. San Francisco, CA / Remote"
          />
          <Field
            label="Portfolio Website"
            value={resume.website}
            onChange={(v) => update("website", v)}
            placeholder="e.g. alexmorgan.dev"
          />
          <Field
            label="LinkedIn Profile"
            value={resume.linkedin}
            onChange={(v) => update("linkedin", v)}
            placeholder="e.g. linkedin.com/in/alexmorgan"
          />
          <Field
            label="GitHub Handle / URL"
            value={resume.github}
            onChange={(v) => update("github", v)}
            placeholder="e.g. github.com/alexmorgan"
          />
          <Field
            label="Professional Summary / Bio"
            value={resume.summary}
            onChange={(v) => update("summary", v)}
            placeholder="A compelling, high-impact synopsis of your expertise, key achievements, and future ambitions..."
            wide
            rows={3}
          />
        </div>
      </section>

      {/* 02: Education */}
      <RepeatGroup
        title="Education & Credentials"
        icon={GraduationCap}
        stepNum="02"
        items={resume.education || []}
        fields={[
          { key: "school", label: "Institution / University", placeholder: "e.g. Stanford University" },
          { key: "degree", label: "Degree / Specialization", placeholder: "e.g. B.S. in Computer Science" },
          { key: "dates", label: "Graduation / Period", placeholder: "e.g. 2022 — 2026" },
          { key: "detail", label: "Honors, GPA or Coursework", placeholder: "Relevant courses, honors, extracurricular achievements", wide: true }
        ]}
        onChange={(id, key, value) => updateList("education", id, key, value)}
        onAdd={() => add("education", "edu", { school: "", degree: "", dates: "", detail: "" })}
        onRemove={(id) => remove("education", id)}
        addLabel="Add Education"
      />

      {/* 03: Experience */}
      <RepeatGroup
        title="Experience & Leadership"
        icon={Briefcase}
        stepNum="03"
        items={resume.experience || []}
        fields={[
          { key: "title", label: "Role / Position", placeholder: "e.g. Software Engineering Intern" },
          { key: "company", label: "Company / Organization", placeholder: "e.g. Vercel / NextLab" },
          { key: "dates", label: "Dates / Duration", placeholder: "e.g. Jan 2025 — Present" },
          { key: "detail", label: "Key Impact & Metrics", placeholder: "Engineered scalable microservices reducing latency by 34%. Collaborated with cross-functional teams...", wide: true, rows: 3 }
        ]}
        onChange={(id, key, value) => updateList("experience", id, key, value)}
        onAdd={() => add("experience", "exp", { title: "", company: "", dates: "", detail: "" })}
        onRemove={(id) => remove("experience", id)}
        addLabel="Add Experience"
      />

      {/* 04: Projects */}
      <RepeatGroup
        title="Key Projects & Work"
        icon={FolderGit2}
        stepNum="04"
        items={resume.projects || []}
        fields={[
          { key: "name", label: "Project Title", placeholder: "e.g. NeuralCanvas 3D" },
          { key: "link", label: "Repository or Live URL", placeholder: "e.g. github.com/user/neural-canvas" },
          { key: "detail", label: "Project Architecture & Results", placeholder: "Developed a WebGL-powered 3D visualization platform handling 10k+ daily queries...", wide: true, rows: 3 }
        ]}
        onChange={(id, key, value) => updateList("projects", id, key, value)}
        onAdd={() => add("projects", "proj", { name: "", link: "", detail: "" })}
        onRemove={(id) => remove("projects", id)}
        addLabel="Add Project"
      />

      {/* 05: Skills & Honors */}
      <section className="form-group-card">
        <div className="group-card-header">
          <div className="group-title-wrap">
            <span className="group-step-pill">05</span>
            <div className="group-title-text">
              <h3>
                <Wrench size={16} className="text-electric" />
                Skills & Accolades
              </h3>
              <span className="group-subtitle">Technologies, frameworks, certifications, and awards</span>
            </div>
          </div>
        </div>

        <div className="fields-grid">
          <Field
            label="Technical Skills (Comma-separated)"
            value={resume.skills}
            onChange={(v) => update("skills", v)}
            placeholder="TypeScript, React, Node.js, Python, Three.js, Docker, Tailwind CSS..."
            wide
            rows={2}
          />
          <Field
            label="Certifications & Honors"
            value={resume.achievements}
            onChange={(v) => update("achievements", v)}
            placeholder="AWS Certified Solutions Architect (2025), 1st Place Hackathon Winner..."
            wide
            rows={2}
          />
        </div>
      </section>

      {/* Privacy Guarantee Footer Note */}
      <div className="form-privacy-note">
        <ShieldCheck size={18} className="privacy-shield-icon" />
        <div className="privacy-text">
          <strong>100% Client-Side Privacy Guarantee</strong>
          <p>
            All information is encrypted and stored strictly within your browser&apos;s local storage.
            Zero cloud tracking, zero data scraping, zero third-party ads.
          </p>
        </div>
      </div>
    </div>
  );
}
