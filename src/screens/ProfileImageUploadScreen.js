import React, { useContext, useState, useEffect, useMemo } from "react";
// import { Link, useNavigate } from "react-router-dom";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserProfile } from "../redux/actions/userActions";
// import Alert from "../components/Alert";
// import Spinner from "../components/shared/Spinner";

const ProfileViewScreen = () => {
  const { darkTheme } = useContext(ThemeContext);

  const fileReader = useMemo(() => new FileReader(), []);

  const [imageBase64, setImageBase64] = useState("");
  const [selectedImg, setSelectedImg] = useState("");

  const handleImageLoad = (e) => {
    setImageBase64(e.target.result);
  };

  useEffect(() => {
    fileReader.addEventListener("load", handleImageLoad);
  }, [fileReader]);

  let selectedImage = null;
  const handleImageSelect = (e) => {
    selectedImage = e.target.files[0];
    setSelectedImg(selectedImage);
    fileReader.readAsDataURL(selectedImage);
  };

  const handleUploadImage = () => {
    console.log(selectedImg);
  };

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
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>

        <form className="upload-image-section">
          <div className="image">
            <img
              src={imageBase64 ? imageBase64 : "/images/avatar.jpg"}
              alt="img"
            />
          </div>

          <div className={`upload-button ${darkTheme ? "dark" : "light"}`}>
            {imageBase64 && (
              <button
                type="button"
                className="image-upload-btn"
                onClick={handleUploadImage}
              >
                Upload Image
              </button>
            )}
            <label className="image-select-btn">
              <div>Select an Image</div>
              <input
                accept={".jpg, .png, .jpeg"}
                type="file"
                name="image"
                onChange={handleImageSelect}
              />
            </label>
          </div>
        </form>
        <br />
      </div>
    </div>
  );
};

export default ProfileViewScreen;
