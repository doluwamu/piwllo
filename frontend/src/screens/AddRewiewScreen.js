import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import AsideBar from "../components/AsideBar";
import ReviewSuccessModal from "../components/modals/ReviewSuccessModal";
import Spinner from "../components/shared/Spinner";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import { createReview } from "../redux/actions/reviewActions";

const AddRewiewScreen = () => {
  const { darkTheme } = useContext(ThemeContext);
  const [review, setReview] = useState("");

  // const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const addReview = useSelector((state) => state.addReview);
  const {
    loading: addReviewLoading,
    success: addReviewSuccess,
    error: addReviewError,
  } = addReview;

  // if (addReviewSuccess) {
  //   setReview("");
  // }

  useEffect(() => {
    if (!userDetails) navigate("/signin");
  }, [userDetails, navigate]);

  const handleReview = (e) => {
    e.preventDefault();
    dispatch(createReview(review));
    setReview("");
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

        {addReviewSuccess && <ReviewSuccessModal />}

        {/* Review */}
        <div className="review">
          <h2>What do you think? We'd love to hear from you</h2>

          {addReviewError && <Alert message={addReviewError} isError={true} />}

          <textarea
            placeholder="Drop a review message"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <div className="review-btn-section">
            <button className="btn-review" type="submit" onClick={handleReview}>
              {addReviewLoading ? (
                <Spinner width="25px" height="25px" marginLeft="45%" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRewiewScreen;
