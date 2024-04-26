import React, { useState, useEffect } from "react";
import UserDataForm from "./components/UserDataForm";
import UserList from "./components/UserList";
// import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    fetch("https://legendary-barnacle-9rq6jr9pg7qcx4x4-3001.app.github.dev/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching user data:', error));
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleSaveData = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );

    fetch("https://legendary-barnacle-9rq6jr9pg7qcx4x4-3001.app.github.dev/api/users", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUsers),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data updated successfully:', data);
        setUsers(updatedUsers);
        // setSelectedUser(null);
      })
      .catch((error) => console.error('Error updating user data:', error));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <UserList users={users} onSelectUser={handleSelectUser} selectedUser={selectedUser} />
        </div>
        <div className="right">
          <UserDataForm
            selectedUser={selectedUser}
            onSaveData={handleSaveData}
            onSelectUser={handleSelectUser}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
