import React, { useContext } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import AsideBar from "../components/AsideBar";
// import Spinner from "../components/shared/Spinner";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
// import { createReview } from "../redux/actions/reviewActions";

const AddRewiewScreen = () => {
  const { darkTheme } = useContext(ThemeContext);

  const handleDeleteReview = () => {
    console.log("delete");
  };

  return (
    <div className="add-review-section main">
      {/* Aside bar */}
      <AsideBar />

      <div
        className={`reviews-section general-section ${
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
        <div className={`reviews ${darkTheme ? "dark" : "light"}`}>
          <h2>Reviews</h2>
          <div className="reviews-list">
            <div className="each-review">
              <div className="review-item owner">
                <label>
                  <b>Owner:</b>
                </label>
                <div className="review-topic owner-info">
                  <div className="owner-name">John</div>
                  <div className="owner-email">John@exp.com</div>
                </div>
              </div>

              <div className="review-item message">
                <label>
                  <b>Message:</b>
                </label>
                <div className="review-topic msg">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Tenetur ullam reprehenderit dolorum molestiae. Repudiandae sed
                  nemo perferendis sint harum voluptatem cumque illum! Cumque
                  numquam rerum ipsum odit saepe tempore maiores?
                </div>
              </div>

              <div className="review-item created-at date">
                <label>
                  <b>Created at:</b>
                </label>
                <div className="review-topic">Time</div>
              </div>

              <div className="review-item last-updated date">
                <label>
                  <b>Last updated:</b>
                </label>
                <div className="review-topic">Time</div>
              </div>

              <div className="review-delete-btn">
                <button type="button" onClick={handleDeleteReview}>
                  Delete
                </button>
              </div>
            </div>

            <div className="each-review">
              <div className="review-item owner">
                <label>
                  <b>Owner:</b>
                </label>
                <div className="review-topic owner-info">
                  <div>John</div>
                  <div>John@exp.com</div>
                </div>
              </div>

              <div className="review-item message">
                <label>
                  <b>Message:</b>
                </label>
                <div className="review-topic msg">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Tenetur ullam reprehenderit dolorum molestiae. Repudiandae sed
                  nemo perferendis sint harum voluptatem cumque illum! Cumque
                  numquam rerum ipsum odit saepe tempore maiores?
                </div>
              </div>

              <div className="review-item created-at date">
                <label>
                  <b>Created at:</b>
                </label>
                <div className="review-topic">Time</div>
              </div>

              <div className="review-item last-updated date">
                <label>
                  <b>Last updated:</b>
                </label>
                <div className="review-topic">Time</div>
              </div>

              <div className="review-delete-btn">
                <button type="button" onClick={handleDeleteReview}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default AddRewiewScreen;
