import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/reducers/userReducer";

function UserDataForm({ onSelectUser, onSaveData }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const selectedUser = useSelector((state) => state.user.selectedUser);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onSelectUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const saveData = () => {
    console.log("Saving data:", selectedUser);
    onSaveData(selectedUser.id, selectedUser);
    window.alert("Changes saved successfully.");
  };

  return (
    <div className="user-form">
      {selectedUser ? (
        <>
          <span className="user-header">
            <input
              type="text"
              name="name"
              className="user-name-input"
              value={selectedUser.name || ""}
              placeholder="Enter user name"
              onChange={handleInputChange}
            />
          </span>
          <div className="user-data">
            <svg
              className="user-picture"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.25 9C8.25 6.92893 9.92893 5.25 12 5.25C14.0711 5.25 15.75 6.92893 15.75 9C15.75 11.0711 14.0711 12.75 12 12.75C9.92893 12.75 8.25 11.0711 8.25 9ZM12 6.75C10.7574 6.75 9.75 7.75736 9.75 9C9.75 10.2426 10.7574 11.25 12 11.25C13.2426 11.25 14.25 10.2426 14.25 9C14.25 7.75736 13.2426 6.75 12 6.75Z"
                  fill="#a3a3a3"
                ></path>{" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 14.5456 3.77827 16.851 5.4421 18.5235C5.6225 17.5504 5.97694 16.6329 6.68837 15.8951C7.75252 14.7915 9.45416 14.25 12 14.25C14.5457 14.25 16.2474 14.7915 17.3115 15.8951C18.023 16.6329 18.3774 17.5505 18.5578 18.5236C20.2217 16.8511 21.25 14.5456 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM17.1937 19.6554C17.0918 18.4435 16.8286 17.5553 16.2318 16.9363C15.5823 16.2628 14.3789 15.75 12 15.75C9.62099 15.75 8.41761 16.2628 7.76815 16.9363C7.17127 17.5553 6.90811 18.4434 6.80622 19.6553C8.28684 20.6618 10.0747 21.25 12 21.25C13.9252 21.25 15.7131 20.6618 17.1937 19.6554Z"
                  fill="#a3a3a3"
                ></path>{" "}
              </g>
            </svg>
            <form>
              <span>
                <label className="form-label" htmlFor="job-title">
                  Должность:
                </label>
                <input
                  id="job-title"
                  type="text"
                  name="jobTitle"
                  value={selectedUser?.jobTitle || ""}
                  onChange={handleInputChange}
                />
              </span>
              <span>
                <label className="form-label" htmlFor="department">
                Отдел:
                </label>
                <input
                  id="department"
                  type="text"
                  name="department"
                  value={selectedUser?.department || ""}
                  onChange={handleInputChange}
                />
              </span>
              <span>
                <label className="form-label" htmlFor="company">
                Компания:
                </label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={selectedUser?.company || ""}
                  onChange={handleInputChange}
                />
              </span>
            </form>
          </div>
          <button id="save-button" onClick={saveData}>Save</button>
        </>
      ) : (
        <div className="no-data"><p>No data to show</p></div>
      )}
    </div>
  );
}

export default UserDataForm;
