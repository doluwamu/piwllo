import React from "react";
import BgImage from "../components/BgImage";
import Section1 from "../components/Section1";

const HomeScreen = () => {
  return (
    <div className="home">
      {/* Backgroud image */}
      <BgImage />

      {/* Section 1 */}
      <Section1 />
    </div>
  );
};

export default HomeScreen;
