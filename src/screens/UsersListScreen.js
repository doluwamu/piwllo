import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import UsersPaginate from "../components/paginations/UserPagination";
import Alert from "../components/Alert";
import Spinner from "../components/shared/Spinner";
import { listAllUsers, removeUser } from "../redux/actions/userActions";

const UserListScreen = () => {
  const { darkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const { pageNumber } = params || 1;

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const getAllUsers = useSelector((state) => state.getAllUsers);
  const {
    loading: getUsersLoading,
    users,
    page,
    pages,
    error: getUsersError,
  } = getAllUsers;

  const deleteUser = useSelector((state) => state.deleteUser);
  const { message: deleteUserMessage, error: deleteUserError } = deleteUser;

  useEffect(() => {
    if (!userDetails) navigate("/signin");
    if (userDetails && !userDetails.isAdmin) navigate("/");
    dispatch(listAllUsers(pageNumber));
  }, [userDetails, navigate, dispatch, deleteUserMessage, pageNumber]);

  const handleDeleteUser = (userId) => {
    const confirm = window.confirm("Do you want to delete this user?");
    if (!confirm) return;
    dispatch(removeUser(userId));
  };

  const redirectToProfile = () => navigate(`/user/${userDetails._id}/profile`);

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
          <img
            src={
              userDetails && userDetails.image
                ? userDetails.image.url
                : "/images/avatar.jpg"
            }
            alt="avatar"
            onClick={redirectToProfile}
          />
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>

        <h1>Users</h1>

        {getUsersError && <Alert message={getUsersError} isError={true} />}
        {deleteUserError && <Alert message={deleteUserError} isError={true} />}

        <div className="list-actions-section">
          <div className="show-users-section">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th className="username">Username</th>
                  <th className="btns" style={{ width: "30px" }}></th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.length > 0 &&
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.email}</td>
                      <td className="username">{user.name}</td>
                      <td>
                        <button
                          type="button"
                          className="btn-delete"
                          style={{ width: "25px" }}
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <i className="fas fa-trash"></i>{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {getUsersLoading ? (
              <Spinner
                width="30px"
                height="30px"
                marginLeft="50%"
                marginTop={"10px"}
                marginBottom={"10px"}
              />
            ) : (
              (!users || users.length === 0) && (
                <p style={{ textAlign: "center" }}>No users found</p>
              )
            )}
          </div>
          <UsersPaginate page={page} pages={pages} />
          <br />
        </div>
      </div>
    </div>
  );
};

export default UserListScreen;
