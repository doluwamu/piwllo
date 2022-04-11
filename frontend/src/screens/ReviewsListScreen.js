import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import { fetchReviews, removeReview } from "../redux/actions/reviewActions";
import Alert from "../components/Alert";
import Spinner from "../components/shared/Spinner";
import Moment from "moment";
import { extendMoment } from "moment-range";

const ReviewListScreen = () => {
  const moment = extendMoment(Moment);

  const [deleteReviewMsg, setDeleteReviewMsg] = useState("");
  const [deleteReviewErr, setDeleteReviewErr] = useState("");

  const { darkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const getReviews = useSelector((state) => state.getReviews);
  const {
    loading: getReviewsLoading,
    reviews,
    error: getReviewsError,
  } = getReviews;

  const deleteReview = useSelector((state) => state.deleteReview);
  const {
    loading: deleteReviewLoading,
    message: deleteReviewMessage,
    error: deleteReviewError,
  } = deleteReview;
  console.log(deleteReview);

  useEffect(() => {
    if (!userDetails) navigate("/signin");
    if (userDetails && !userDetails.isAdmin) navigate("/");
    dispatch(fetchReviews());
  }, [userDetails, navigate, dispatch, deleteReviewMessage]);

  const handleDeleteReview = (reviewId) => {
    dispatch(removeReview(reviewId));
    setDeleteReviewMsg(deleteReviewMessage);
    setDeleteReviewErr(deleteReviewError);
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

          {getReviewsError && (
            <Alert message={getReviewsError} isError={true} />
          )}
          {deleteReviewError && (
            <Alert message={deleteReviewErr} isError={true} />
          )}

          {deleteReviewMessage && <Alert message={deleteReviewMsg} />}

          <div className="reviews-list">
            {getReviewsLoading ? (
              <div
                style={{ width: "50px", height: "50px", margin: "30px auto" }}
              >
                <Spinner width="40px" height="40px" />
              </div>
            ) : !reviews || reviews.length < 1 ? (
              <p style={{ textAlign: "center" }}>No review here</p>
            ) : (
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
                      <b>Created on:</b>
                    </label>
                    <div className="review-topic">
                      {moment(review.createdt).format(
                        "dddd, MMMM Do YYYY, h:mm a"
                      )}
                    </div>
                  </div>

                  <div className="review-delete-btn">
                    <button
                      type="button"
                      onClick={() => handleDeleteReview(review._id)}
                    >
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

export default ReviewListScreen;
