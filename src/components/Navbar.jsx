import React, { useState, useEffect } from "react";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";

export default function Navbar({ page, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (target) => {
    setMobileMenuOpen(false);
    if (target === "home") {
      onNavigate("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target === "builder") {
      onNavigate("builder");
    } else if (target === "portfolio") {
      onNavigate("portfolio");
    } else if (target === "features") {
      if (page !== "home") {
        onNavigate("home");
        setTimeout(() => {
          document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
      }
    } else if (target === "about") {
      if (page !== "home") {
        onNavigate("home");
        setTimeout(() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`sakshima-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Brand Logo */}
        <button
          className="sakshima-brand"
          onClick={() => handleNavClick("home")}
          aria-label="SAKSHIMA Home"
        >
          <div className="brand-emblem">
            <svg viewBox="0 0 32 32" fill="none" className="brand-svg">
              <path
                d="M22 9H13.5C11.0147 9 9 11.0147 9 13.5C9 15.9853 11.0147 18 13.5 18H18.5C20.9853 18 23 20.0147 23 22.5C23 24.9853 20.9853 27 18.5 27H10"
                stroke="url(#navBrandGrad)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="navBrandGrad" x1="9" y1="9" x2="23" y2="27" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00A3FF" />
                  <stop offset="1" stopColor="#0066FF" />
                </linearGradient>
              </defs>
            </svg>
            <span className="brand-glow-dot" />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-name">SAKSHIMA</span>
            <span className="brand-tagline">IDENTITY ENGINE</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav-links" aria-label="Main Navigation">
          <button
            className={`sakshima-nav-link ${page === "home" ? "active" : ""}`}
            onClick={() => handleNavClick("home")}
          >
            Home
          </button>
          <button
            className="sakshima-nav-link"
            onClick={() => handleNavClick("features")}
          >
            Features
          </button>
          <button
            className={`sakshima-nav-link ${page === "builder" ? "active" : ""}`}
            onClick={() => handleNavClick("builder")}
          >
            Resume
          </button>
          <button
            className={`sakshima-nav-link ${page === "portfolio" ? "active" : ""}`}
            onClick={() => handleNavClick("portfolio")}
          >
            Portfolio
          </button>
          <button
            className="sakshima-nav-link"
            onClick={() => handleNavClick("about")}
          >
            About
          </button>
        </nav>

        {/* Right CTA */}
        <div className="nav-actions">
          <button
            className="btn-electric-cta"
            onClick={() => handleNavClick("builder")}
          >
            <span>Get Started</span>
            <ArrowRight size={15} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <div className="mobile-links-list">
            <button
              className={`mobile-nav-link ${page === "home" ? "active" : ""}`}
              onClick={() => handleNavClick("home")}
            >
              Home
            </button>
            <button
              className="mobile-nav-link"
              onClick={() => handleNavClick("features")}
            >
              Features
            </button>
            <button
              className={`mobile-nav-link ${page === "builder" ? "active" : ""}`}
              onClick={() => handleNavClick("builder")}
            >
              Resume Builder
            </button>
            <button
              className={`mobile-nav-link ${page === "portfolio" ? "active" : ""}`}
              onClick={() => handleNavClick("portfolio")}
            >
              Portfolio Experience
            </button>
            <button
              className="mobile-nav-link"
              onClick={() => handleNavClick("about")}
            >
              About SAKSHIMA
            </button>
            <button
              className="btn-electric-cta mobile-cta"
              onClick={() => handleNavClick("builder")}
            >
              <span>Launch Builder</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
