import React, { useState } from "react";
import { ArrowLeft, Download, ExternalLink, Globe, Mail, MapPin, Phone, Sparkles, User, Briefcase, GraduationCap, FolderGit2, Award, Check } from "lucide-react";
import Card3D from "../components/Card3D.jsx";

// Inline social SVGs
const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function PortfolioPreview({ resume = {}, onBack, onHome }) {
  const [copied, setCopied] = useState(false);

  // Fallback data if user hasn't filled everything yet
  const name = resume.fullName || "Alex Morgan";
  const role = resume.role || "Futuristic Software Engineer & Designer";
  const bio = resume.summary || "Pioneering the intersection of software architecture and immersive digital identity. Passionate about building robust, high-performance systems and cinematic user experiences.";
  const skillsList = (resume.skills || "React, TypeScript, Node.js, WebGL, Python, UI/UX Architecture, Distributed Systems")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const projects = Array.isArray(resume.projects) && resume.projects.length > 0 && resume.projects.some(p => p.name)
    ? resume.projects.filter(p => p.name)
    : [
        { id: "p1", name: "CyberMatrix 3D", link: "https://github.com/example/cyber-matrix", detail: "High-performance WebGL geometric renderer with real-time audio reactive particle systems." },
        { id: "p2", name: "AetherFlow Engine", link: "https://aetherflow.io", detail: "Distributed state synchronization engine for multi-agent autonomous workloads." },
        { id: "p3", name: "OmniTrack Mobile", link: "", detail: "Cross-platform biometric tracking suite built with zero-latency local caching." }
      ];

  const experience = Array.isArray(resume.experience) && resume.experience.length > 0 && resume.experience.some(e => e.title || e.company)
    ? resume.experience.filter(e => e.title || e.company)
    : [
        { id: "e1", title: "Senior Identity Engineer", company: "NextGen Labs", dates: "2024 — Present", detail: "Spearheaded front-end 3D interfaces and real-time state synchronization for 500k active users." },
        { id: "e2", title: "Software Engineer Intern", company: "Quantum Digital", dates: "2023 — 2024", detail: "Built responsive modular components and optimized client bundle sizes by 42%." }
      ];

  const education = Array.isArray(resume.education) && resume.education.length > 0 && resume.education.some(e => e.school || e.degree)
    ? resume.education.filter(e => e.school || e.degree)
    : [
        { id: "ed1", school: "Stanford University", degree: "B.S. in Computer Science & Interactive Media", dates: "2020 — 2024", detail: "Specialization in Computer Graphics, Distributed Systems, and Human-Computer Interaction." }
      ];

  const filled = (val) => Boolean(val && val.trim());

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => window.print();

  return (
    <div className="sakshima-portfolio-page">
      {/* Top Navigation Bar */}
      <nav className="portfolio-top-nav">
        <div className="portfolio-nav-left">
          <button className="btn-nav-back" onClick={onBack || onHome}>
            <ArrowLeft size={16} /> Return to Builder
          </button>
          <button className="btn-nav-home" onClick={onHome}>
            Home
          </button>
        </div>

        <div className="portfolio-nav-center">
          <span className="live-portfolio-pill">
            <span className="pill-pulse" /> SAKSHIMA WEB IDENTITY
          </span>
        </div>

        <div className="portfolio-nav-right">
          <button className="btn-secondary-action" onClick={handleCopyLink}>
            {copied ? <Check size={14} className="text-electric" /> : <ExternalLink size={14} />}
            <span>{copied ? "Link Copied!" : "Share Link"}</span>
          </button>
          <button className="btn-primary-action" onClick={handlePrint}>
            <Download size={14} />
            <span>Print View</span>
          </button>
        </div>
      </nav>

      {/* Main Portfolio Container */}
      <main className="portfolio-main-container">
        {/* Hero Identity Banner */}
        <header className="portfolio-hero-section">
          <div className="hero-cyber-ambient" aria-hidden="true" />
          
          <div className="portfolio-hero-content">
            <div className="hero-status-tag">
              <Sparkles size={13} className="text-electric" />
              <span>AVAILABLE FOR AMBITIOUS CHALLENGES</span>
            </div>

            <h1 className="portfolio-name-heading">
              {name}
            </h1>

            <p className="portfolio-role-subhead">
              {role}
            </p>

            <p className="portfolio-bio-text">
              {bio}
            </p>

            {/* Contact Pills */}
            <div className="portfolio-contact-row">
              {filled(resume.email) && (
                <a href={`mailto:${resume.email}`} className="portfolio-contact-link">
                  <Mail size={14} /> <span>{resume.email}</span>
                </a>
              )}
              {filled(resume.phone) && (
                <a href={`tel:${resume.phone}`} className="portfolio-contact-link">
                  <Phone size={14} /> <span>{resume.phone}</span>
                </a>
              )}
              {filled(resume.location) && (
                <span className="portfolio-contact-link static">
                  <MapPin size={14} /> <span>{resume.location}</span>
                </span>
              )}
              {filled(resume.website) && (
                <a href={resume.website.startsWith("http") ? resume.website : `https://${resume.website}`} target="_blank" rel="noopener noreferrer" className="portfolio-contact-link">
                  <Globe size={14} /> <span>{resume.website}</span>
                </a>
              )}
              {filled(resume.linkedin) && (
                <a href={resume.linkedin.startsWith("http") ? resume.linkedin : `https://${resume.linkedin}`} target="_blank" rel="noopener noreferrer" className="portfolio-contact-link">
                  <LinkedinIcon size={14} /> <span>LinkedIn</span>
                </a>
              )}
              {filled(resume.github) && (
                <a href={resume.github.startsWith("http") ? resume.github : `https://${resume.github}`} target="_blank" rel="noopener noreferrer" className="portfolio-contact-link">
                  <GithubIcon size={14} /> <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Featured Projects Grid */}
        <section className="portfolio-section">
          <div className="section-header-block">
            <div className="section-eyebrow">
              <FolderGit2 size={15} className="text-electric" />
              <span>01 / SELECTED WORK</span>
            </div>
            <h2 className="section-main-heading">Featured Projects</h2>
          </div>

          <div className="portfolio-projects-grid">
            {projects.map((proj, idx) => (
              <Card3D key={proj.id || idx} className="portfolio-project-card-wrap">
                <div className="portfolio-project-card">
                  <div className="project-card-top">
                    <span className="project-idx-pill">0{idx + 1}</span>
                    {proj.link && (
                      <a
                        href={proj.link.startsWith("http") ? proj.link : `https://${proj.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-live-btn"
                      >
                        <span>Launch</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>

                  <h3 className="project-card-title">{proj.name}</h3>
                  <p className="project-card-desc">{proj.detail}</p>

                  <div className="project-card-glow-line" />
                </div>
              </Card3D>
            ))}
          </div>
        </section>

        {/* Skills Tag Cloud */}
        <section className="portfolio-section">
          <div className="section-header-block">
            <div className="section-eyebrow">
              <Sparkles size={15} className="text-electric" />
              <span>02 / TECHNICAL ARSENAL</span>
            </div>
            <h2 className="section-main-heading">Core Skills & Technologies</h2>
          </div>

          <div className="portfolio-skills-cloud">
            {skillsList.map((skill, idx) => (
              <span key={idx} className="portfolio-skill-pill">
                <span className="skill-dot" />
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section className="portfolio-section">
          <div className="section-header-block">
            <div className="section-eyebrow">
              <Briefcase size={15} className="text-electric" />
              <span>03 / CAREER TRAJECTORY</span>
            </div>
            <h2 className="section-main-heading">Experience & Milestones</h2>
          </div>

          <div className="portfolio-experience-list">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx} className="portfolio-exp-card">
                <div className="exp-left-bar">
                  <div className="exp-glow-node" />
                  <div className="exp-rail" />
                </div>
                <div className="exp-content">
                  <div className="exp-headline">
                    <h3 className="exp-role">{exp.title}</h3>
                    {exp.dates && <span className="exp-period">{exp.dates}</span>}
                  </div>
                  {exp.company && <div className="exp-org">{exp.company}</div>}
                  {exp.detail && <p className="exp-detail">{exp.detail}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Credentials */}
        <section className="portfolio-section">
          <div className="section-header-block">
            <div className="section-eyebrow">
              <GraduationCap size={15} className="text-electric" />
              <span>04 / ACADEMIC FOUNDATION</span>
            </div>
            <h2 className="section-main-heading">Education & Certifications</h2>
          </div>

          <div className="portfolio-edu-grid">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="portfolio-edu-card">
                <div className="edu-top-row">
                  <h3 className="edu-degree">{edu.degree}</h3>
                  {edu.dates && <span className="edu-dates">{edu.dates}</span>}
                </div>
                <div className="edu-school">{edu.school}</div>
                {edu.detail && <p className="edu-detail">{edu.detail}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Honors & Accolades (if present) */}
        {filled(resume.achievements) && (
          <section className="portfolio-section">
            <div className="section-header-block">
              <div className="section-eyebrow">
                <Award size={15} className="text-electric" />
                <span>05 / DISTINCTIONS</span>
              </div>
              <h2 className="section-main-heading">Honors & Accolades</h2>
            </div>
            <div className="portfolio-achievements-box">
              <p>{resume.achievements}</p>
            </div>
          </section>
        )}

        {/* Portfolio Footer */}
        <footer className="portfolio-bottom-footer">
          <div className="footer-brand-lockup">
            <span className="footer-brand-title">SAKSHIMA</span>
            <span className="footer-brand-sub">Build Your Future. Define Your Identity.</span>
          </div>
          <div className="footer-actions">
            <button className="btn-secondary-action" onClick={onBack || onHome}>
              Back to Builder
            </button>
            <button className="btn-primary-action" onClick={handlePrint}>
              Export Identity PDF
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
