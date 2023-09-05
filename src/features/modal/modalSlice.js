import { createSlice } from "@reduxjs/toolkit";

export const MODAL_TYPES = {
    editBoard: "editBoard",
    editTask: "editTask",
    addColumn: "addColumn",
    addTask: "addTask",
    addBoard: "addBoard",
    deleteBoard: "deleteBoard",
    deleteTask: "deleteTask",
    viewTask: "viewTask"
}

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        type: ""
    },
    reducers: {
        setModalType: (state, action) => {
            state.type = action.payload
        }
    }
})

export const { setModalType } = modalSlice.actions

export default modalSlice.reducer