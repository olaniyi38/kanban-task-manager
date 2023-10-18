import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: "dark"
    },
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
        }
    }
})


export default themeSlice.reducer

export const selectTheme = state => state.theme

export const { setTheme } = themeSlice.actions