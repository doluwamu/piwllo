import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import {
  fetchReviews,
  removeReview,
  reviewLike,
} from "../redux/actions/reviewActions";
import Alert from "../components/Alert";
import Spinner from "../components/shared/Spinner";
import Moment from "moment";
import { extendMoment } from "moment-range";
// import { GET_REVIEWS_RESET } from "../redux/constants/reviewConstants";

const ReviewListScreen = () => {
  const moment = extendMoment(Moment);

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

  const likeReview = useSelector((state) => state.likeReview);
  const { liked } = likeReview;

  const deleteReview = useSelector((state) => state.deleteReview);
  const { message: deleteReviewMessage, error: deleteReviewError } =
    deleteReview;

  useEffect(() => {
    if (!userDetails) navigate("/signin");
    if (userDetails && !userDetails.isAdmin) navigate("/");
    dispatch(fetchReviews());
  }, [userDetails, navigate, dispatch, deleteReviewMessage, liked]);

  const handleLikeReview = (reviewId) => {
    dispatch(reviewLike(reviewId));
    // dispatch({ type: GET_REVIEWS_RESET });
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(removeReview(reviewId));
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
            <Alert message={deleteReviewError} isError={true} />
          )}

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
                    {/* <label>
                      <b>Owner:</b>
                    </label> */}
                    <div className="review-topic owner-info">
                      {/* <div className="owner-name">{review.user.name}</div> */}
                      <div className="owner-email" style={{ fontSize: "12px" }}>
                        {review.user.email}
                      </div>

                      <div className="like-review">
                        {review.liked ? (
                          <i
                            className="fa-solid fa-heart red"
                            onClick={() => handleLikeReview(review._id)}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-heart"
                            onClick={() => handleLikeReview(review._id)}
                          ></i>
                        )}
                      </div>
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
