import { createSlice } from '@reduxjs/toolkit'

const User = createSlice({
    name: 'user',
    initialState: {
        userInfo: sessionStorage.user ? JSON.parse(sessionStorage.user) : {}
    },
    reducers: {
        setUser(state, value) {
            state.userInfo = value;
        }
    }
})


export default User.reducer;