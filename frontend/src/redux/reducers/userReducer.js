import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    selectedUser: null,
    isLoading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload;
            state.isLoading = false;
        },
        setSelectedUser(state, action) {
            state.selectedUser = action.payload;
        },
        updateUserData(state, action) {
            const { userId, updatedFields } = action.payload;
            const index = state.users.findIndex(user => user.id === userId);
            if (index !== -1) {
                state.users[index] = { ...state.users[index], ...updatedFields };
            }
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        }
    },
});

export const { setUsers, setSelectedUser, updateUserData, setIsLoading } = userSlice.actions;
export default userSlice.reducer;