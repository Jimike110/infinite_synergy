import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/reducers/userReducer";

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const isLoading = useSelector((state) => state.user.isLoading);

  const handleUserClick = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div className="user-list">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user)}
              className="user"
              style={{ backgroundColor: selectedUser && selectedUser.id === user.id ? "#82d1ff" : "" }}
            >
              <svg
                fill="#000000"
                viewBox="0 0 24 24"
                id="user-svg"
                data-name="Flat Color"
                xmlns="http://www.w3.org/2000/svg"
                className="icon flat-color"
                stroke="#000000"
                strokeWidth="0.00024000000000000003"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    id="primary"
                    d="M21,20a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2,8,8,0,0,1,1.79-5,2,2,0,0,1,2.67-.39,8.07,8.07,0,0,0,9.07,0,2,2,0,0,1,2.68.39A8,8,0,0,1,21,20Zm-9-6A6,6,0,1,0,6,8,6,6,0,0,0,12,14Z"
                    style={{ fill: "#0d5173" }}
                  ></path>
                </g>
              </svg>
              <h5 className="user-name">{user.name}</h5>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default UserList;
