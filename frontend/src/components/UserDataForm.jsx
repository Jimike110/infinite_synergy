import React from "react";

function UserDataForm({ selectedUser, onSelectUser, onSaveData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onSelectUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const saveData = () => {
    console.log("Saving data:", selectedUser);
    onSaveData(selectedUser);
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
            <img
              className="user-picture"
              src="https://jimike.netlify.app/images/favicon.png"
              alt={`${selectedUser.name}'s picture`}
            ></img>
            <form>
              <span>
                <label className="form-label" htmlFor="department">
                  Department:
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
                <label className="form-label" htmlFor="job-title">
                  Job Title:
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
                <label className="form-label" htmlFor="company">
                  Company:
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
          <button onClick={saveData}>Save</button>
        </>
      ) : (
        <div>No data to show</div>
      )}
    </div>
  );
}

export default UserDataForm;
