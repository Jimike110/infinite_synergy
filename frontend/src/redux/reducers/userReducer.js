import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    selectedUser: null,
    isLoading: false,
    page: 1,
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
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
    },
});

export const { setUsers, setSelectedUser, setIsLoading, setPage } = userSlice.actions;
export default userSlice.reducer;