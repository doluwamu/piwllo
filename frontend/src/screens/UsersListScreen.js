import React, { useContext, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AsideBar from "../components/AsideBar";
// import ViewTaskDetailsModal from "../components/modals/ViewTaskDetailsModal";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
// import { listTaskByRank, removeTask } from "../redux/actions/taskActions";
// import { firstLetterToUpperCase } from "../helpers/wordHelpers";
// import Alert from "../components/Alert";
// import Spinner from "../components/shared/Spinner";

const UserListScreen = () => {
  const { darkTheme } = useContext(ThemeContext);
  //   const dispatch = useDispatch();
    const navigate = useNavigate();
  //   const params = useParams();
  //   const { taskRank } = params;

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  useEffect(() => {
    if (!userDetails) navigate("/signin");
    if (userDetails && !userDetails.isAdmin) navigate("/");
  }, [ userDetails, navigate]);


  const handleDeleteUser = () => {
    console.log("deleted");
  };

  return (
    <div className="user-list-section main">
      {/* Aside bar */}
      <AsideBar />

      {/* task actions */}
      <div
        className={`list-section general-section ${
          darkTheme ? "dark" : "light"
        }`}
      >
        {/* Theme tuggle button */}
        <div className="theme-btn-section">
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>

        <h1>Users</h1>

        <div className="list-actions-section">
          <div className="show-users-section">
            <table>
              <thead>
                <tr>
                  <th style={{}}>Email</th>
                  <th className="username">Username</th>
                  <th className="btns"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>test2@gmail.com</td>
                  <td className="username">Adeitan Doluwamu Adeleye</td>
                  <td>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => handleDeleteUser()}
                    >
                      <i className="fas fa-trash"></i>{" "}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default UserListScreen;

//   <Spinner
//     width="30px"
//     height="30px"
//     marginLeft="50%"
//     marginTop={"10px"}
//     marginBottom={"10px"}
//   />
