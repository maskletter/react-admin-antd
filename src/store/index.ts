import { configureStore } from '@reduxjs/toolkit'
import User from './user'
import Table from './pages/table'

const store = configureStore({
    reducer: {
        user: User,
        table: Table
    }
})


export default store;