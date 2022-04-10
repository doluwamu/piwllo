import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AsideBar from "../components/AsideBar";
// import Spinner from "../components/shared/Spinner";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import { fetchReviews } from "../redux/actions/reviewActions";
import Alert from "../components/Alert";
import Spinner from "../components/shared/Spinner";
import Moment from "moment";
import { extendMoment } from "moment-range";
// import { createReview } from "../redux/actions/reviewActions";

const AddRewiewScreen = () => {
  const moment = extendMoment(Moment);

  const { darkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const getReviews = useSelector((state) => state.getReviews);
  const { loading, reviews, error } = getReviews;

  useEffect(() => {
    if (!userDetails) navigate("/signin");
    if (userDetails && !userDetails.isAdmin) navigate("/");
    dispatch(fetchReviews());
  }, [userDetails, navigate, dispatch]);

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
          {error && <Alert message={error} isError={true} />}
          <div className="reviews-list">
            {loading ? (
              <div
                style={{ width: "50px", height: "50px", margin: "30px auto" }}
              >
                <Spinner width="40px" height="40px" />
              </div>
            ) : (
              !loading &&
              reviews &&
              reviews.map((review) => (
                <div className="each-review" key={review._id}>
                  <div className="review-item owner">
                    <label>
                      <b>Owner:</b>
                    </label>
                    <div className="review-topic owner-info">
                      {/* <div className="owner-name">{review.user.name}</div> */}
                      <div className="owner-email">{review.user.email}</div>
                    </div>
                  </div>

                  <div className="review-item message">
                    <label>
                      <b>Message:</b>
                    </label>
                    <div className="review-topic msg">{review.review}</div>
                  </div>

                  <div className="review-item created-at date">
                    <label>
                      <b>Created at:</b>
                    </label>
                    <div className="review-topic">
                      {moment(review.createdt).format(
                        "dddd, MMMM Do YYYY, h:mm a"
                      )}
                    </div>
                  </div>

                  <div className="review-item last-updated date">
                    <label>
                      <b>Last updated:</b>
                    </label>
                    <div className="review-topic">
                      {moment(review.updatedAt).format(
                        "dddd, MMMM Do YYYY, h:mm a"
                      )}
                    </div>
                  </div>

                  <div className="review-delete-btn">
                    <button type="button" onClick={handleDeleteReview}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default AddRewiewScreen;
