import { useEffect, useState } from "react";
import "./Preloader.css";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out after 3 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    // Remove completely after fade animation
    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 3800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className={`preloader ${fadeOut ? "preloader-hide" : ""}`}>
      <div className="preloader-content">

        <img
          src="images/llogo.png"
          alt="Eagle Novelties"
          className="preloader-logo"
        />

        <div className="preloader-line">
          <div className="preloader-progress"></div>
        </div>

      </div>
    </div>
  );
}
