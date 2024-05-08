import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setIsLoading } from "./redux/reducers/userReducer";
import UserDataForm from "./components/UserDataForm";
import UserList from "./components/UserList";

function App() {
  const users = useSelector((state) => state.user.users);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.user.page);
  const limit = 1000;
  const appUrl = "http://" + window.location.hostname;

  useEffect(() => {
    // Fetch user data when component mounts
    fetchUserData();
    // eslint-disable-next-line
  }, [page]);

  const fetchUserData = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await fetch(`${appUrl}:3001/api/users?page=${page}&limit=${limit}`);
      const data = await response.json();
      dispatch(setUsers(data));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleSaveData = async (userId, updatedFields) => {
    try {
      const response = await fetch(`${appUrl}:3001/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });
      const data = await response.json();
      console.log('Данные пользователя обновлены:', data);
      
      // Update the user data in the users array
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return { ...user, ...updatedFields };
        }
        return user;
      });
      dispatch(setUsers(updatedUsers));
    } catch (error) {
      console.error('Ошибка обновления пользовательских данных:', error);
    }
  };  
  

  return (
    <div className="App">
      <div className="container">
        <div className="left">
        {isLoading ? (
        <div className="loader"><p>Загрузка...</p></div>
      ) : (<div className="list">
          <UserList />
          </div>
      ) }
        </div>
        <div className="right">
          <UserDataForm
            onSaveData={handleSaveData}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
