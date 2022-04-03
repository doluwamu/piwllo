import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import BgImage from "../components/BgImage";
import ThemeToggleButton from "../components/ThemeToggleButton";
import Footer from "../components/Footer";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import { ThemeContext } from "../context/ThemeContext";
import Aos from "aos";
import "aos/dist/aos.css";

const HomeScreen = () => {
  const { darkTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const location = useLocation();

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/task-manager";

  useEffect(() => {
    if (userDetails) {
      navigate(redirect);
    }
    Aos.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 50,
    });
  }, [userDetails, navigate, redirect]);

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
