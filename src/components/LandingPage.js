import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Player } from "@lottiefiles/react-lottie-player";
import "../assets/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  const handleStart = () => {
    navigate("/gallery");
  };

  useEffect(() => {
    // Animation for title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );

    // Animation for description
    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    );

    // Animation for button
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.8, ease: "elastic.out(1, 0.5)" }
    );
  }, []);

  return (
    <div className="landing-page">
      {/* Social Links */}
      <div className="top-links">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={30} className="social-icon" />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub size={30} className="social-icon" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={30} className="social-icon" />
        </a>
      </div>

      {/* Two-Column Layout */}
      <div className="content">
        {/* Left Column */}
        <div className="left-column">
          <h1 ref={titleRef} className="hero-title">
            Welcome to the <span className="highlight">Dark Gallery</span>
          </h1>
          <p ref={descriptionRef} className="hero-description">
            Dive into a curated collection of stunning visuals. Experience art like never before in this sleek, modern design.
          </p>
          <button ref={buttonRef} onClick={handleStart}>
            Start Exploring
          </button>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <Player
            src="https://lottie.host/d41cc8eb-1137-429d-bc7b-848c65e3be33/qa3GlZ7ygX.json"
            background="transparent"
            speed={1}
            style={{ width: 350, height: 350 }}
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
