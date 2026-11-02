import React, { useEffect, useState } from "react";
import { ArrowLeft, Check, Download, Eye, RotateCcw, ShieldCheck, Sparkles, ExternalLink, ZoomIn, ZoomOut } from "lucide-react";
import FormSection from "../components/FormSection.jsx";
import ResumePreview from "../components/ResumePreview.jsx";
import TemplateSelector from "../components/TemplateSelector.jsx";
import { clearResume, saveResume } from "../utils/storage.js";
import { sampleResume } from "../utils/resumeData.js";

export default function Builder({ resume, setResume, template, setTemplate, onBack, onPortfolio }) {
  const [saved, setSaved] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setSaved(saveResume(resume));
  }, [resume]);

  const exportPdf = () => window.print();

  const reset = () => {
    if (window.confirm("Clear all resume information stored in this browser? This cannot be undone.")) {
      clearResume();
      window.location.reload();
    }
  };

  const loadSampleData = () => {
    if (window.confirm("Replace your current draft with the sample profile data?")) {
      setResume(sampleResume);
    }
  };

  return (
    <main className="sakshima-builder-page">
      {/* Top Application Bar */}
      <div className="builder-topbar">
        <div className="builder-topbar-left">
          <button className="builder-back-btn" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>SAKSHIMA Home</span>
          </button>
          <div className="builder-autosave-indicator">
            <span className={`status-pulse-dot ${saved ? "active" : "error"}`} />
            <span className="status-text">
              {saved ? "Draft Encrypted & Saved Locally" : "Sync issue"}
            </span>
          </div>
        </div>

        <div className="builder-topbar-right">
          <button className="btn-toolbar-ghost" onClick={loadSampleData}>
            <Sparkles size={14} className="text-electric" />
            <span>Load Sample Data</span>
          </button>
          <button className="btn-toolbar-ghost danger" onClick={reset}>
            <RotateCcw size={13} />
            <span>Clear Draft</span>
          </button>
          <button className="btn-electric-cta compact" onClick={exportPdf}>
            <Download size={15} />
            <span>Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Builder Workspace Header */}
      <div className="builder-workspace-header">
        <div className="workspace-title-block">
          <div className="workspace-badge">
            <Sparkles size={12} className="text-electric" />
            <span>IDENTITY WORKSPACE</span>
          </div>
          <h1>Craft Your Career Identity<span className="text-electric">.</span></h1>
          <p>Modular, distraction-free drafting. Live preview compiles in real-time as you type.</p>
        </div>

        <div className="workspace-quick-actions">
          <button className="btn-secondary-action" onClick={onPortfolio}>
            <span>View as Web Portfolio</span>
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

      {/* Main Dual-Column Layout */}
      <div className="builder-layout-container">
        {/* Left Column: Form Editor */}
        <section className="builder-editor-column">
          <FormSection resume={resume} setResume={setResume} />
        </section>

        {/* Right Column: Live Sticky Preview */}
        <aside className="builder-preview-column">
          <div className="preview-top-controls">
            <div className="preview-title-group">
              <Eye size={16} className="text-electric" />
              <span>Live Engine Output</span>
              <span className="live-pill-badge">
                <span className="badge-pulse" /> LIVE
              </span>
            </div>

            <div className="zoom-controls">
              <button
                className="zoom-btn"
                onClick={() => setZoomLevel((prev) => Math.max(0.65, prev - 0.1))}
                aria-label="Zoom out"
                disabled={zoomLevel <= 0.65}
              >
                <ZoomOut size={14} />
              </button>
              <span className="zoom-display">{Math.round(zoomLevel * 100)}%</span>
              <button
                className="zoom-btn"
                onClick={() => setZoomLevel((prev) => Math.min(1.2, prev + 0.1))}
                aria-label="Zoom in"
                disabled={zoomLevel >= 1.2}
              >
                <ZoomIn size={14} />
              </button>
            </div>
          </div>

          {/* Template Selector */}
          <TemplateSelector value={template} onChange={setTemplate} />

          {/* Live Preview Paper Canvas */}
          <div className="preview-paper-viewport">
            <div
              className="preview-scale-wrapper"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "top center"
              }}
            >
              <ResumePreview resume={resume} template={template} />
            </div>
          </div>

          {/* Help & Switcher Actions */}
          <div className="preview-bottom-actions">
            <div className="pdf-fidelity-note">
              <Check size={14} className="text-electric" />
              <span>Pixel-perfect ATS vector format. Click &ldquo;Save as PDF&rdquo; to print.</span>
            </div>
            <button className="btn-electric-wide" onClick={onPortfolio}>
              <span>Launch Live Portfolio Experience</span>
              <ExternalLink size={15} />
            </button>
          </div>
        </aside>
      </div>

      {/* Builder Footer */}
      <footer className="builder-subfooter">
        <span>SAKSHIMA Engine · Next-Gen Career Identity System</span>
        <span>© {new Date().getFullYear()} SAKSHIMA. All drafts stay local to your machine.</span>
      </footer>
    </main>
  );
}
