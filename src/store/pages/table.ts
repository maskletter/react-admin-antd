import { createSlice } from '@reduxjs/toolkit'

const Table = createSlice({
    name: 'table',
    initialState: {
        info: {} as any
    },
    reducers: {
        setInfo(state, { payload }) {
            state.info = payload;
        }
    }
})

export { Table as tableStore }
export default Table.reducer;