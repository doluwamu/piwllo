import React, { useContext, useState } from "react";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";

const AddRewiewScreen = () => {
  const { darkTheme } = useContext(ThemeContext);
  const [review, setReview] = useState("");

  const handleReview = (e) => {
    e.preventDefault();
  };

  return (
    <div className="add-review-section main">
      {/* Aside bar */}
      <AsideBar />

      <div
        className={`review-section general-section ${
          darkTheme ? "dark" : "light"
        }`}
      >
        {/* Theme tuggle button */}
        <div className="theme-btn-section">
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>

        {/* Review */}
        <div className="review">
          <h2>What do you think? We'd love to hear from you</h2>
          <textarea
            placeholder="Drop a review message"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <div className="review-btn-section">
            <button className="btn-review" type="submit" onClick={handleReview}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRewiewScreen;
