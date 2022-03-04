import React, { useContext } from "react";
import BgImage from "../components/BgImage";
import ThemeToggleButton from "../components/ThemeToggleButton";
import Footer from "../components/Footer";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import { ThemeContext } from "../context/ThemeContext";

const HomeScreen = () => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className="home">
      {/* Backgroud image */}
      <BgImage />

      {/* Theme tuggle button */}
      <div className="theme-btn-section">
        <div className="theme-btn-container">
          <ThemeToggleButton />
        </div>
      </div>

      {/* Section 1 */}
      <Section1 darkTheme={darkTheme} />

      {/* Section 2 */}
      <Section2 darkTheme={darkTheme} />

      {/* Section 2 */}
      <Section3 darkTheme={darkTheme} />

      {/* Section 2 */}
      <Footer />
    </div>
  );
};

export default HomeScreen;
