import React, { useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import { useSelector } from "react-redux";
import { uploadImage } from "../redux/actions/uploadActions";
import {
  connectionError,
  connectionErrorMessage,
  cloudinaryError,
  cloudinaryErrorMessage,
  serverErrors,
} from "../redux/actions/errors.global";
import Spinner from "../components/shared/Spinner";
import Alert from "../components/Alert";

const ProfileViewScreen = () => {
  const { darkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const fileReader = useMemo(() => new FileReader(), []);

  const [imageBase64, setImageBase64] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

  const [error, setError] = useState("");

  const handleImageLoad = (e) => {
    setImageBase64(e.target.result);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  useEffect(() => {
    if (!userDetails) navigate("/signin");
    fileReader.addEventListener("load", handleImageLoad);
  }, [fileReader, userDetails, navigate]);

  let selectedImage = null;
  const handleImageSelect = async (e) => {
    try {
      selectedImage = e.target.files[0];
      setSelectedImg(selectedImage);
      setImageUploaded(false);
      setError("");
      fileReader.readAsDataURL(selectedImage);

      const { data } = await uploadImage(selectedImage);
      setImageUploaded(true);
      navigate(`/user/${userDetails._id}/profile/edit`, {
        state: { image: data },
      });
    } catch (error) {
      return error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message === connectionError
        ? setError(connectionErrorMessage)
        : error.response.data.message.includes(cloudinaryError)
        ? setError(cloudinaryErrorMessage)
        : error.message && error.message === serverErrors
        ? setError(connectionErrorMessage)
        : setError(error.response.data.message) || setError(error.message);
    }
  };

  const redirectToProfile = () => navigate(`/user/${userDetails._id}/profile`);

  return (
    <div className="image-upload-section main">
      {/* Aside bar */}
      <AsideBar />

      {/* Profile section */}
      <div
        className={`profile-image-upload-section general-section ${
          darkTheme ? "dark" : "light"
        }`}
      >
        {/* Theme tuggle button */}
        <div className="theme-btn-section">
          <img
            src={userDetails ? userDetails.image.url : "/images/avatar.jpg"}
            alt="avatar"
            onClick={redirectToProfile}
          />
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>

        {error && error.length > 0 && <Alert message={error} isError={true} />}

        <form className="upload-image-section">
          <div className="image">
            <img
              src={
                imageBase64
                  ? imageBase64
                  : userDetails
                  ? userDetails.image.url
                  : "/images/avatar.jpg"
              }
              alt="img"
            />
          </div>

          <div className={`upload-button ${darkTheme ? "dark" : "light"}`}>
            {!imageUploaded && selectedImg && (!error || error.length < 1) ? (
              <button type="button" className="image-upload-btn">
                <Spinner width="20px" height="20px" marginLeft="45%" />
              </button>
            ) : (
              <label className="image-select-btn">
                <div>Select an Image</div>
                <input
                  accept={".jpg, .png, .jpeg"}
                  type="file"
                  name="image"
                  onChange={handleImageSelect}
                />
              </label>
            )}
          </div>
        </form>
        <br />
      </div>
    </div>
  );
};

export default ProfileViewScreen;
