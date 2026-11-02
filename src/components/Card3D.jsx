import React, { useRef, useState } from "react";

export default function Card3D({ children, className = "", onClick, glowColor = "rgba(0, 163, 255, 0.35)", maxTilt = 12 }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.55
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      className={`card-3d-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="card-3d-inner"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${isHovered ? "translateZ(12px)" : "translateZ(0px)"}`,
          transition: isHovered ? "transform 0.1s ease-out, box-shadow 0.25s ease" : "transform 0.5s ease-out, box-shadow 0.4s ease",
          boxShadow: isHovered
            ? `0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px -5px ${glowColor}`
            : "0 10px 25px -10px rgba(0, 0, 0, 0.5)"
        }}
      >
        {children}
        {/* Dynamic Specular Glare Overlay */}
        <div
          className="card-3d-glare"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(0, 163, 255, 0.25) 0%, rgba(255, 255, 255, 0.08) 25%, transparent 65%)`,
            opacity: glare.opacity,
            transition: "opacity 0.3s ease",
            pointerEvents: "none"
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
