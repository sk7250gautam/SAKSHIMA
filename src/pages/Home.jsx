import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  FileText,
  Palette,
  Eye,
  Download,
  Sparkles,
  Layers,
  Zap,
  ExternalLink,
  ShieldCheck,
  Code,
  Cpu,
  LockKeyhole
} from "lucide-react";
import SakshimaHero3D from "../components/SakshimaHero3D.jsx";
import Card3D from "../components/Card3D.jsx";
import ResumePreview from "../components/ResumePreview.jsx";
import { sampleResume } from "../utils/resumeData.js";

// Inline Github icon to guarantee zero missing exports
const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Home({ onStart, onExplorePortfolio, onLoadSample, setTemplate }) {
  const [activeShowcaseTemplate, setActiveShowcaseTemplate] = useState("modern");

  const handleSelectTemplateAndBuild = (tpl) => {
    if (setTemplate) setTemplate(tpl);
    onStart();
  };

  return (
    <main className="sakshima-home-page">
      {/* Background Cyber Grid & Light Trails */}
      <div className="bg-cyber-grid" aria-hidden="true" />
      <div className="bg-glow-orb orb-primary" aria-hidden="true" />
      <div className="bg-glow-orb orb-secondary" aria-hidden="true" />

      {/* ==============================================================
          SECTION 1: HERO — WOW EFFECT
          ============================================================== */}
      <section className="sakshima-hero-section">
        <div className="hero-content-grid">
          {/* Left: Cinematic Copy */}
          <motion.div
            className="hero-text-column"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Holographic Badge */}
            <motion.div
              className="hero-eyebrow-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles size={14} className="badge-sparkle" />
              <span>NEXT-GEN CAREER IDENTITY PLATFORM</span>
              <span className="badge-dot" />
            </motion.div>

            {/* Main Heading */}
            <h1 className="hero-main-heading">
              <span className="heading-line line-1">YOUR FUTURE.</span>
              <span className="heading-line line-2">YOUR IDENTITY.</span>
              <span className="heading-line line-3">
                YOUR <span className="electric-text">SAKSHIMA.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Create professional resumes and stunning portfolios that make opportunities find you.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="hero-action-buttons"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
            >
              <button className="btn-hero-primary" onClick={onStart}>
                <span className="btn-shine" />
                <span className="btn-label">Build My Resume</span>
                <ArrowRight size={17} />
              </button>

              <button className="btn-hero-secondary" onClick={onExplorePortfolio}>
                <Eye size={17} />
                <span>Explore Portfolio</span>
              </button>
            </motion.div>

            {/* Trust Features Strip */}
            <motion.div
              className="hero-trust-metrics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.8 }}
            >
              <div className="trust-metric-item">
                <Check size={14} className="text-electric" />
                <span>100% Free &amp; Private</span>
              </div>
              <div className="trust-divider" />
              <div className="trust-metric-item">
                <Check size={14} className="text-electric" />
                <span>Zero Account Friction</span>
              </div>
              <div className="trust-divider" />
              <div className="trust-metric-item">
                <Check size={14} className="text-electric" />
                <span>ATS-Engineered</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: 3D Holographic Sphere & Floating Cards */}
          <div className="hero-3d-column">
            {/* The Interactive 3D Canvas */}
            <SakshimaHero3D />

            {/* Floating 3D Metric Card: Top Right */}
            <motion.div
              className="hero-floating-card card-top-right"
              initial={{ opacity: 0, x: 40, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="floating-card-icon">
                <Cpu size={16} className="text-electric" />
              </div>
              <div className="floating-card-text">
                <span className="floating-title">ATS Readiness</span>
                <strong className="floating-metric">99.8% Parsable</strong>
              </div>
              <span className="pulse-indicator" />
            </motion.div>

            {/* Floating 3D Metric Card: Bottom Left */}
            <motion.div
              className="hero-floating-card card-bottom-left"
              initial={{ opacity: 0, x: -40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="floating-card-icon">
                <Zap size={16} className="text-electric" />
              </div>
              <div className="floating-card-text">
                <span className="floating-title">Instant Web Portfolio</span>
                <strong className="floating-metric">Real-time Sync</strong>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blue Light Beam Divider */}
      <div className="section-light-beam" aria-hidden="true" />

      {/* ==============================================================
          SECTION 2: THE PROBLEM
          ============================================================== */}
      <section className="sakshima-section" id="about">
        <div className="section-container">
          <div className="section-header-centered">
            <span className="section-tag-pill">01 / THE CHALLENGE</span>
            <h2 className="section-title-large">
              Your Skills Deserve More Than a Simple Document<span className="text-electric">.</span>
            </h2>
            <p className="section-lead-text">
              Traditional resumes are flat, uninspiring, and easily lost in automated applicant tracking systems. In a hyper-competitive digital landscape, static text fails to convey your real potential.
            </p>
          </div>

          <div className="problem-cards-grid">
            <Card3D className="problem-card-wrap">
              <div className="problem-card">
                <div className="problem-num">01</div>
                <h3 className="problem-title">The 6-Second Screen Drop</h3>
                <p className="problem-body">
                  Recruiters glance at standard documents for merely 6 seconds. Without clear visual hierarchy and ATS-first typography, crucial milestones go completely unnoticed.
                </p>
                <div className="problem-stat-badge">
                  <span>Average attention: 6.2s</span>
                </div>
              </div>
            </Card3D>

            <Card3D className="problem-card-wrap">
              <div className="problem-card">
                <div className="problem-num">02</div>
                <h3 className="problem-title">The Fragmented Identity</h3>
                <p className="problem-body">
                  Your GitHub repositories, design prototypes, and live projects are scattered across detached browser tabs. Hiring teams rarely take the effort to open separate links.
                </p>
                <div className="problem-stat-badge">
                  <span>82% of external links skipped</span>
                </div>
              </div>
            </Card3D>

            <Card3D className="problem-card-wrap">
              <div className="problem-card">
                <div className="problem-num">03</div>
                <h3 className="problem-title">Format Degradation</h3>
                <p className="problem-body">
                  Legacy word processors break margins, distort layouts on mobile screens, and fail robotic ATS parsers due to messy invisible markup and unstandardized tables.
                </p>
                <div className="problem-stat-badge">
                  <span>75% rejected by ATS</span>
                </div>
              </div>
            </Card3D>
          </div>

          {/* SAKSHIMA Contrast Banner */}
          <motion.div
            className="sakshima-advantage-banner"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="banner-glow-effect" />
            <div className="banner-content">
              <Sparkles size={24} className="text-electric" />
              <div>
                <h3>The SAKSHIMA Standard</h3>
                <p>
                  We transform your raw credentials into an interconnected, multi-dimensional career presence: a precision vector PDF for human recruiters and robotic parsers, coupled with an interactive web portfolio that showcases the true depth of your work.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 3: OUR SOLUTION
          ============================================================== */}
      <section className="sakshima-section" id="features">
        <div className="section-container">
          <div className="section-header-centered">
            <span className="section-tag-pill">02 / THE ARCHITECTURE</span>
            <h2 className="section-title-large">
              One Platform. Endless Possibilities<span className="text-electric">.</span>
            </h2>
            <p className="section-lead-text">
              Engineered from the ground up to give creators, developers, and professionals an unfair career advantage.
            </p>
          </div>

          <div className="solution-features-grid">
            {/* Feature 1 */}
            <Card3D className="solution-card-wrap">
              <div className="solution-card">
                <div className="solution-icon-box">
                  <FileText size={22} className="text-electric" />
                </div>
                <h3 className="solution-title">Professional Resume Builder</h3>
                <p className="solution-desc">
                  Distraction-free modular editor. Fill in your achievements, education, and technical skills with instant real-time feedback.
                </p>
                <div className="solution-feature-tags">
                  <span>Zero Lag</span>
                  <span>Instant Validation</span>
                </div>
              </div>
            </Card3D>

            {/* Feature 2 */}
            <Card3D className="solution-card-wrap">
              <div className="solution-card">
                <div className="solution-icon-box">
                  <Code size={22} className="text-electric" />
                </div>
                <h3 className="solution-title">Personal Portfolio Builder</h3>
                <p className="solution-desc">
                  Transforms your resume credentials into a futuristic, interactive web portfolio with zero extra configuration or coding.
                </p>
                <div className="solution-feature-tags">
                  <span>Interactive 3D</span>
                  <span>Shareable View</span>
                </div>
              </div>
            </Card3D>

            {/* Feature 3 */}
            <Card3D className="solution-card-wrap">
              <div className="solution-card">
                <div className="solution-icon-box">
                  <Eye size={22} className="text-electric" />
                </div>
                <h3 className="solution-title">Real-Time Live Preview</h3>
                <p className="solution-desc">
                  Watch your document materialize line by line. What you see on screen is 100% true to the final exported document.
                </p>
                <div className="solution-feature-tags">
                  <span>Side-by-Side</span>
                  <span>Zoom Controls</span>
                </div>
              </div>
            </Card3D>

            {/* Feature 4 */}
            <Card3D className="solution-card-wrap">
              <div className="solution-card">
                <div className="solution-icon-box">
                  <Palette size={22} className="text-electric" />
                </div>
                <h3 className="solution-title">Multiple Curated Templates</h3>
                <p className="solution-desc">
                  Precision-designed architectures: Classic for executive elegance, Modern for bold tech impact, and Compact for maximum density.
                </p>
                <div className="solution-feature-tags">
                  <span>Classic</span>
                  <span>Modern</span>
                  <span>Compact</span>
                </div>
              </div>
            </Card3D>

            {/* Feature 5 */}
            <Card3D className="solution-card-wrap">
              <div className="solution-card">
                <div className="solution-icon-box">
                  <Download size={22} className="text-electric" />
                </div>
                <h3 className="solution-title">Vector-Grade PDF Export</h3>
                <p className="solution-desc">
                  One-click native vector print compilation. Retains razor-sharp typography, flawless margins, and full ATS string readability.
                </p>
                <div className="solution-feature-tags">
                  <span>Vector Quality</span>
                  <span>Zero Watermarks</span>
                </div>
              </div>
            </Card3D>

            {/* Feature 6 (Client-Side Privacy) */}
            <Card3D className="solution-card-wrap">
              <div className="solution-card">
                <div className="solution-icon-box">
                  <LockKeyhole size={22} className="text-electric" />
                </div>
                <h3 className="solution-title">100% Client-Side Privacy</h3>
                <p className="solution-desc">
                  Your data remains strictly inside your browser&apos;s local storage. No cloud leaks, no account requirements, no data harvesting.
                </p>
                <div className="solution-feature-tags">
                  <span>Encrypted Local</span>
                  <span>No Sign-Up</span>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 4: RESUME BUILDER SHOWCASE
          ============================================================== */}
      <section className="sakshima-section showcase-section">
        <div className="section-container">
          <div className="section-header-centered">
            <span className="section-tag-pill">03 / RESUME BLUEPRINTS</span>
            <h2 className="section-title-large">
              Engineered for Clarity. Built for Impact<span className="text-electric">.</span>
            </h2>
            <p className="section-lead-text">
              Inspect the three foundational architectures. Switch between templates in real time and test the visual hierarchy.
            </p>
          </div>

          {/* Interactive Template Selector Tabs */}
          <div className="showcase-tabs-container">
            <button
              className={`showcase-tab ${activeShowcaseTemplate === "classic" ? "active" : ""}`}
              onClick={() => setActiveShowcaseTemplate("classic")}
            >
              <span className="tab-indicator" />
              <div className="tab-info">
                <strong>Classic Blueprint</strong>
                <span>Timeless &amp; Structured</span>
              </div>
            </button>

            <button
              className={`showcase-tab ${activeShowcaseTemplate === "modern" ? "active" : ""}`}
              onClick={() => setActiveShowcaseTemplate("modern")}
            >
              <span className="tab-indicator" />
              <div className="tab-info">
                <strong>Modern Blueprint</strong>
                <span>Electric Accent &amp; Avatar</span>
              </div>
            </button>

            <button
              className={`showcase-tab ${activeShowcaseTemplate === "compact" ? "active" : ""}`}
              onClick={() => setActiveShowcaseTemplate("compact")}
            >
              <span className="tab-indicator" />
              <div className="tab-info">
                <strong>Compact Blueprint</strong>
                <span>High Density Dual-Column</span>
              </div>
            </button>
          </div>

          {/* 3D Perspective Showcase Viewport */}
          <div className="showcase-stage-wrap">
            <div className="showcase-stage-ambient" />
            <motion.div
              className="showcase-viewport-3d"
              key={activeShowcaseTemplate}
              initial={{ opacity: 0, rotateX: 6, y: 15 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="viewport-top-status">
                <span className="status-badge">
                  <span className="status-live-dot" /> ACTIVE TEMPLATE: {activeShowcaseTemplate.toUpperCase()}
                </span>
                <button
                  className="btn-use-template"
                  onClick={() => handleSelectTemplateAndBuild(activeShowcaseTemplate)}
                >
                  <span>Use This Blueprint</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="showcase-preview-frame">
                <ResumePreview resume={sampleResume} template={activeShowcaseTemplate} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 5: PORTFOLIO SHOWCASE
          ============================================================== */}
      <section className="sakshima-section">
        <div className="section-container">
          <div className="section-header-centered">
            <span className="section-tag-pill">04 / DIGITAL IDENTITY</span>
            <h2 className="section-title-large">
              Your Personal Web Portfolio, Generated Instantly<span className="text-electric">.</span>
            </h2>
            <p className="section-lead-text">
              No hosting setup. No domain hurdles. SAKSHIMA turns your resume into an interactive, high-fidelity web identity at the touch of a button.
            </p>
          </div>

          {/* 3D Device / Window Frame for Web Portfolio */}
          <div className="portfolio-device-frame-wrap">
            <div className="portfolio-device-frame">
              {/* Browser Bar */}
              <div className="browser-topbar">
                <div className="browser-dots">
                  <span className="b-dot red" />
                  <span className="b-dot yellow" />
                  <span className="b-dot green" />
                </div>
                <div className="browser-url-pill">
                  <span>https://sakshima.dev/id/alex-morgan</span>
                </div>
                <div className="browser-actions">
                  <span className="ssl-badge">
                    <Check size={11} /> Secured
                  </span>
                </div>
              </div>

              {/* Inside Mock Portfolio View */}
              <div className="mock-portfolio-inner">
                <div className="mock-hero">
                  <span className="mock-eyebrow">IDENTITY PREVIEW</span>
                  <h3 className="mock-name">Alex Morgan</h3>
                  <div className="mock-title">Aspiring Product Designer &amp; Creative Technologist</div>
                  <p className="mock-bio">
                    Detail-oriented designer creating intuitive, high-impact digital products. Transforming complex technical challenges into frictionless user experiences.
                  </p>
                </div>

                <div className="mock-cards-row">
                  <div className="mock-card">
                    <span className="mock-card-tag">PROJECT 01</span>
                    <strong>StudySpace Concept</strong>
                    <p>Designed a student study-planner prototype tested with 5 classmate cohorts.</p>
                  </div>
                  <div className="mock-card">
                    <span className="mock-card-tag">PROJECT 02</span>
                    <strong>Local Loop Identity</strong>
                    <p>Built visual system and landing page architecture for community initiatives.</p>
                  </div>
                  <div className="mock-card">
                    <span className="mock-card-tag">CAPABILITIES</span>
                    <div className="mock-tags">
                      <span>Figma</span>
                      <span>Wireframing</span>
                      <span>React</span>
                      <span>Research</span>
                    </div>
                  </div>
                </div>

                <div className="mock-cta-overlay">
                  <button className="btn-electric-cta" onClick={onExplorePortfolio}>
                    <span>Experience Full Live Portfolio</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 6: HOW IT WORKS
          ============================================================== */}
      <section className="sakshima-section">
        <div className="section-container">
          <div className="section-header-centered">
            <span className="section-tag-pill">05 / THE WORKFLOW</span>
            <h2 className="section-title-large">
              Three Steps to Career Acceleration<span className="text-electric">.</span>
            </h2>
            <p className="section-lead-text">
              Go from raw experience to an award-caliber resume and web portfolio in under 10 minutes.
            </p>
          </div>

          <div className="steps-cards-container">
            {/* Step 1 */}
            <div className="step-card">
              <div className="step-number-wrap">
                <span className="step-number">01</span>
                <span className="step-glow-trail" />
              </div>
              <h3 className="step-title">Enter Your Details</h3>
              <p className="step-desc">
                Input your education, projects, past experience, and technical competencies into distraction-free modular fields.
              </p>
              <div className="step-feature-bullet">
                <Check size={14} className="text-electric" />
                <span>Auto-saved continuously in browser</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-card">
              <div className="step-number-wrap">
                <span className="step-number">02</span>
                <span className="step-glow-trail" />
              </div>
              <h3 className="step-title">Customize Your Design</h3>
              <p className="step-desc">
                Choose between Classic, Modern, or Compact layouts. Watch the typography and layout adapt in real time side by side.
              </p>
              <div className="step-feature-bullet">
                <Check size={14} className="text-electric" />
                <span>Tailored for ATS &amp; human readers</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <div className="step-number-wrap">
                <span className="step-number">03</span>
              </div>
              <h3 className="step-title">Download &amp; Share</h3>
              <p className="step-desc">
                Compile a crisp vector-quality PDF ready for job submissions, or share your live web portfolio with recruiters worldwide.
              </p>
              <div className="step-feature-bullet">
                <Check size={14} className="text-electric" />
                <span>Zero fees, watermarks, or accounts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 7: FINAL CTA
          ============================================================== */}
      <section className="sakshima-section cta-section">
        <div className="section-container">
          <motion.div
            className="final-cta-card"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="cta-ambient-beam" />
            <div className="cta-content">
              <span className="cta-eyebrow">
                <Sparkles size={14} className="text-electric" />
                <span>ELEVATE YOUR CAREER TRAJECTORY</span>
              </span>

              <h2 className="cta-heading">
                Your Next Opportunity Starts Here<span className="text-electric">.</span>
              </h2>

              <p className="cta-subtitle">
                Join thousands of creators, engineers, and designers who define their identity with SAKSHIMA.
              </p>

              <div className="cta-button-row">
                <button className="btn-hero-primary" onClick={onStart}>
                  <span className="btn-shine" />
                  <span className="btn-label">Create Your Identity</span>
                  <ArrowRight size={17} />
                </button>

                <button className="btn-hero-secondary" onClick={onLoadSample}>
                  <Sparkles size={16} />
                  <span>Load Sample Profile</span>
                </button>
              </div>

              <div className="cta-assurance">
                <ShieldCheck size={16} className="text-electric" />
                <span>100% Client-Side Encryption · No Sign-Up Needed · Instant PDF Vector Output</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 8: FOOTER
          ============================================================== */}
      <footer className="sakshima-footer">
        <div className="footer-container">
          <div className="footer-top-row">
            {/* Brand column */}
            <div className="footer-brand-column">
              <div className="footer-logo-row">
                <div className="footer-emblem">
                  <svg viewBox="0 0 32 32" fill="none" className="footer-svg">
                    <path
                      d="M22 9H13.5C11.0147 9 9 11.0147 9 13.5C9 15.9853 11.0147 18 13.5 18H18.5C20.9853 18 23 20.0147 23 22.5C23 24.9853 20.9853 27 18.5 27H10"
                      stroke="#00A3FF"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="footer-brand-title">SAKSHIMA</span>
              </div>
              <p className="footer-brand-tagline">
                Build Your Future. Define Your Identity.
              </p>
              <div className="footer-meta-pill">
                <span className="meta-dot" /> High-Performance 3D Career System
              </div>
            </div>

            {/* Navigation links */}
            <div className="footer-links-grid">
              <div className="footer-link-group">
                <span className="group-title">Navigation</span>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</button>
                <button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>Features</button>
                <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>About SAKSHIMA</button>
                <button onClick={onStart}>Resume Builder</button>
                <button onClick={onExplorePortfolio}>Portfolio Builder</button>
              </div>

              <div className="footer-link-group">
                <span className="group-title">Templates</span>
                <button onClick={() => handleSelectTemplateAndBuild("classic")}>Classic Blueprint</button>
                <button onClick={() => handleSelectTemplateAndBuild("modern")}>Modern Blueprint</button>
                <button onClick={() => handleSelectTemplateAndBuild("compact")}>Compact Blueprint</button>
                <button onClick={onLoadSample}>Sample Showcase</button>
              </div>

              <div className="footer-link-group">
                <span className="group-title">Ecosystem</span>
                <a
                  href="https://github.com/sk7250gautam/SAKSHIMA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-external-link"
                >
                  <GithubIcon size={14} />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href="https://first-step-mvp.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-external-link"
                >
                  <ExternalLink size={14} />
                  <span>Live Deployment</span>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <span>© {new Date().getFullYear()} SAKSHIMA. All rights reserved.</span>
            <span>Crafted for high-performing creators &amp; engineers worldwide.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
