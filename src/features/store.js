import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boards/boardsSlice";
import modalSlice from "./modal/modalSlice";


const loggerMiddleware = (store) => (next) => (action) => {
    console.log("new action");
    console.info("prevState: ", store.getState());

    console.info(`type: ${action.type}`);
    console.info("payload: ", action.payload);

    next(action);

    console.info("newState: ", store.getState());
};

const store = configureStore({
    reducer: {
        boards: boardsSlice,
        modal: modalSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loggerMiddleware),
    devTools: process.env.NODE_ENV !== "production"
});


export default store 