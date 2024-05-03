import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setIsLoading, setSelectedUser } from "./redux/reducers/userReducer";
import UserDataForm from "./components/UserDataForm";
import UserList from "./components/UserList";

function App() {
  // const [users, setUsers] = useState([]);
  const users = useSelector((state) => state.user.users);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  // const [isLoading, setIsLoading] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(null);
  const appUrl = "http://" + window.location.hostname;

  useEffect(() => {
    // Fetch user data when component mounts
    fetchUserData();
  }, [page]);

  const fetchUserData = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await fetch(`https://legendary-barnacle-9rq6jr9pg7qcx4x4-3001.app.github.dev/api/users?page=${page}&limit=1000`);
      const data = await response.json();
      dispatch(setUsers(data));
      console.log(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const nextPage = () => {
    setPage(page + 1);
    setSelectedUser(null);
  };

  const prevPage = () => {
    setPage(page - 1);
    setSelectedUser(null);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleSaveData = async (userId, updatedFields) => {
    try {
      const response = await fetch(`https://legendary-barnacle-9rq6jr9pg7qcx4x4-3001.app.github.dev/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });
      const data = await response.json();
      console.log('User data updated:', data);
      
      // Update the user data in the users array
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return { ...user, ...updatedFields };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };  
  

  return (
    <div className="App">
      <div className="container">
        <div className="left">
        {isLoading ? (
        <div className="loader"><p>Loading...</p></div>
      ) : (<div className="list-and-pagination">
          <UserList />
          <div className="pagination-buttons">
          <button className="paginate-button prev" onClick={prevPage} disabled={page === 1}>Previous Page</button>
          <button className="paginate-button next" disabled={page === 1000} onClick={nextPage}>Next Page</button>
          </div>
          </div>
      ) }
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
