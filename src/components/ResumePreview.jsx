import React from "react";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";

// Inline social icons to guarantee 0 external import failures
const GithubIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ResumePreview({ resume = {}, template = "classic" }) {
  const skills = (resume.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const filled = (val) => Boolean(val && val.trim());

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return (name[0] || "S").toUpperCase();
  };

  return (
    <article className={`resume-paper resume-${template}`}>
      {/* ===================== TEMPLATE: CLASSIC ===================== */}
      {template === "classic" && (
        <div className="template-classic-inner">
          <header className="classic-header">
            <h1 className="classic-name">{resume.fullName || "Your Full Name"}</h1>
            <div className="classic-role">{resume.role || "Professional Title / Field"}</div>

            <div className="classic-contact-bar">
              {filled(resume.email) && (
                <span className="contact-item">
                  <Mail size={11} /> {resume.email}
                </span>
              )}
              {filled(resume.phone) && (
                <span className="contact-item">
                  <Phone size={11} /> {resume.phone}
                </span>
              )}
              {filled(resume.location) && (
                <span className="contact-item">
                  <MapPin size={11} /> {resume.location}
                </span>
              )}
              {filled(resume.website) && (
                <span className="contact-item">
                  <Globe size={11} /> {resume.website}
                </span>
              )}
              {filled(resume.linkedin) && (
                <span className="contact-item">
                  <LinkedinIcon size={11} /> {resume.linkedin}
                </span>
              )}
              {filled(resume.github) && (
                <span className="contact-item">
                  <GithubIcon size={11} /> {resume.github}
                </span>
              )}
            </div>
            <div className="classic-divider" />
          </header>

          {filled(resume.summary) && (
            <section className="resume-section">
              <h2 className="section-title">Professional Summary</h2>
              <p className="summary-paragraph">{resume.summary}</p>
            </section>
          )}

          {Array.isArray(resume.experience) && resume.experience.length > 0 && (
            <section className="resume-section">
              <h2 className="section-title">Work Experience</h2>
              {resume.experience.map((exp, idx) => (
                <div key={exp.id || idx} className="resume-entry">
                  <div className="entry-header">
                    <div>
                      <strong className="entry-title">{exp.title || "Position Title"}</strong>
                      {exp.company && <span className="entry-org"> — {exp.company}</span>}
                    </div>
                    {exp.dates && <span className="entry-date">{exp.dates}</span>}
                  </div>
                  {exp.detail && <p className="entry-body">{exp.detail}</p>}
                </div>
              ))}
            </section>
          )}

          {Array.isArray(resume.education) && resume.education.length > 0 && (
            <section className="resume-section">
              <h2 className="section-title">Education</h2>
              {resume.education.map((edu, idx) => (
                <div key={edu.id || idx} className="resume-entry">
                  <div className="entry-header">
                    <div>
                      <strong className="entry-title">{edu.degree || "Degree / Course"}</strong>
                      {edu.school && <span className="entry-org"> — {edu.school}</span>}
                    </div>
                    {edu.dates && <span className="entry-date">{edu.dates}</span>}
                  </div>
                  {edu.detail && <p className="entry-body">{edu.detail}</p>}
                </div>
              ))}
            </section>
          )}

          {Array.isArray(resume.projects) && resume.projects.length > 0 && (
            <section className="resume-section">
              <h2 className="section-title">Key Projects</h2>
              {resume.projects.map((proj, idx) => (
                <div key={proj.id || idx} className="resume-entry">
                  <div className="entry-header">
                    <strong className="entry-title">{proj.name || "Project Name"}</strong>
                    {proj.link && <span className="entry-link">{proj.link}</span>}
                  </div>
                  {proj.detail && <p className="entry-body">{proj.detail}</p>}
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section className="resume-section">
              <h2 className="section-title">Technical & Professional Skills</h2>
              <div className="skills-badge-wrap">
                {skills.map((skill, idx) => (
                  <span key={idx} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {filled(resume.achievements) && (
            <section className="resume-section">
              <h2 className="section-title">Honors & Certifications</h2>
              <p className="summary-paragraph">{resume.achievements}</p>
            </section>
          )}
        </div>
      )}

      {/* ===================== TEMPLATE: MODERN ===================== */}
      {template === "modern" && (
        <div className="template-modern-inner">
          <header className="modern-hero-banner">
            <div className="modern-avatar">
              {getInitials(resume.fullName)}
            </div>
            <div className="modern-hero-info">
              <h1 className="modern-name">{resume.fullName || "Your Full Name"}</h1>
              <div className="modern-role">{resume.role || "Professional Title / Field"}</div>
              <div className="modern-contact-list">
                {filled(resume.email) && (
                  <span className="modern-contact-pill">
                    <Mail size={10} /> {resume.email}
                  </span>
                )}
                {filled(resume.phone) && (
                  <span className="modern-contact-pill">
                    <Phone size={10} /> {resume.phone}
                  </span>
                )}
                {filled(resume.location) && (
                  <span className="modern-contact-pill">
                    <MapPin size={10} /> {resume.location}
                  </span>
                )}
                {filled(resume.website) && (
                  <span className="modern-contact-pill">
                    <Globe size={10} /> {resume.website}
                  </span>
                )}
                {filled(resume.linkedin) && (
                  <span className="modern-contact-pill">
                    <LinkedinIcon size={10} /> {resume.linkedin}
                  </span>
                )}
                {filled(resume.github) && (
                  <span className="modern-contact-pill">
                    <GithubIcon size={10} /> {resume.github}
                  </span>
                )}
              </div>
            </div>
          </header>

          <div className="modern-body-content">
            {filled(resume.summary) && (
              <section className="modern-section">
                <h2 className="modern-section-title">
                  <span className="title-bar" /> About Me
                </h2>
                <p className="summary-paragraph">{resume.summary}</p>
              </section>
            )}

            {Array.isArray(resume.experience) && resume.experience.length > 0 && (
              <section className="modern-section">
                <h2 className="modern-section-title">
                  <span className="title-bar" /> Experience
                </h2>
                <div className="modern-timeline">
                  {resume.experience.map((exp, idx) => (
                    <div key={exp.id || idx} className="modern-timeline-item">
                      <div className="timeline-dot" />
                      <div className="modern-entry-header">
                        <span className="entry-title">{exp.title || "Role"}</span>
                        {exp.company && <span className="entry-org">@{exp.company}</span>}
                        {exp.dates && <span className="entry-date">{exp.dates}</span>}
                      </div>
                      {exp.detail && <p className="entry-body">{exp.detail}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {Array.isArray(resume.projects) && resume.projects.length > 0 && (
              <section className="modern-section">
                <h2 className="modern-section-title">
                  <span className="title-bar" /> Featured Projects
                </h2>
                <div className="modern-projects-grid">
                  {resume.projects.map((proj, idx) => (
                    <div key={proj.id || idx} className="modern-project-card">
                      <div className="project-card-head">
                        <strong>{proj.name || "Project"}</strong>
                        {proj.link && <span className="project-link-badge">{proj.link}</span>}
                      </div>
                      {proj.detail && <p className="entry-body">{proj.detail}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {Array.isArray(resume.education) && resume.education.length > 0 && (
              <section className="modern-section">
                <h2 className="modern-section-title">
                  <span className="title-bar" /> Education & Credentials
                </h2>
                {resume.education.map((edu, idx) => (
                  <div key={edu.id || idx} className="resume-entry">
                    <div className="entry-header">
                      <div>
                        <strong className="entry-title">{edu.degree || "Degree"}</strong>
                        {edu.school && <span className="entry-org"> · {edu.school}</span>}
                      </div>
                      {edu.dates && <span className="entry-date">{edu.dates}</span>}
                    </div>
                    {edu.detail && <p className="entry-body">{edu.detail}</p>}
                  </div>
                ))}
              </section>
            )}

            {skills.length > 0 && (
              <section className="modern-section">
                <h2 className="modern-section-title">
                  <span className="title-bar" /> Core Competencies
                </h2>
                <div className="skills-badge-wrap">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="modern-skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {filled(resume.achievements) && (
              <section className="modern-section">
                <h2 className="modern-section-title">
                  <span className="title-bar" /> Honors & Awards
                </h2>
                <p className="summary-paragraph">{resume.achievements}</p>
              </section>
            )}
          </div>
        </div>
      )}

      {/* ===================== TEMPLATE: COMPACT ===================== */}
      {template === "compact" && (
        <div className="template-compact-inner">
          <header className="compact-header">
            <div>
              <h1 className="compact-name">{resume.fullName || "Your Full Name"}</h1>
              <div className="compact-role">{resume.role || "Professional Title"}</div>
            </div>
            <div className="compact-contacts-block">
              {filled(resume.email) && <span>{resume.email}</span>}
              {filled(resume.phone) && <span>{resume.phone}</span>}
              {filled(resume.location) && <span>{resume.location}</span>}
              {filled(resume.website) && <span>{resume.website}</span>}
              {filled(resume.linkedin) && <span>{resume.linkedin}</span>}
              {filled(resume.github) && <span>{resume.github}</span>}
            </div>
          </header>

          <div className="compact-grid-layout">
            <div className="compact-col-main">
              {filled(resume.summary) && (
                <section className="compact-section">
                  <h2 className="compact-title">Summary</h2>
                  <p className="compact-body">{resume.summary}</p>
                </section>
              )}

              {Array.isArray(resume.experience) && resume.experience.length > 0 && (
                <section className="compact-section">
                  <h2 className="compact-title">Experience</h2>
                  {resume.experience.map((exp, idx) => (
                    <div key={exp.id || idx} className="compact-item">
                      <div className="compact-item-top">
                        <strong className="compact-item-title">{exp.title}</strong>
                        {exp.dates && <span className="compact-date">{exp.dates}</span>}
                      </div>
                      {exp.company && <div className="compact-company">{exp.company}</div>}
                      {exp.detail && <p className="compact-body">{exp.detail}</p>}
                    </div>
                  ))}
                </section>
              )}

              {Array.isArray(resume.projects) && resume.projects.length > 0 && (
                <section className="compact-section">
                  <h2 className="compact-title">Projects</h2>
                  {resume.projects.map((proj, idx) => (
                    <div key={proj.id || idx} className="compact-item">
                      <div className="compact-item-top">
                        <strong className="compact-item-title">{proj.name}</strong>
                        {proj.link && <span className="compact-link">({proj.link})</span>}
                      </div>
                      {proj.detail && <p className="compact-body">{proj.detail}</p>}
                    </div>
                  ))}
                </section>
              )}
            </div>

            <div className="compact-col-side">
              {skills.length > 0 && (
                <section className="compact-section">
                  <h2 className="compact-title">Skills</h2>
                  <div className="compact-skills-list">
                    {skills.map((skill, idx) => (
                      <span key={idx} className="compact-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {Array.isArray(resume.education) && resume.education.length > 0 && (
                <section className="compact-section">
                  <h2 className="compact-title">Education</h2>
                  {resume.education.map((edu, idx) => (
                    <div key={edu.id || idx} className="compact-item">
                      <strong className="compact-item-title">{edu.degree}</strong>
                      {edu.school && <div className="compact-school">{edu.school}</div>}
                      {edu.dates && <div className="compact-date">{edu.dates}</div>}
                      {edu.detail && <p className="compact-body">{edu.detail}</p>}
                    </div>
                  ))}
                </section>
              )}

              {filled(resume.achievements) && (
                <section className="compact-section">
                  <h2 className="compact-title">Achievements</h2>
                  <p className="compact-body">{resume.achievements}</p>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
