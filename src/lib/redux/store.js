import { configureStore } from "@reduxjs/toolkit";
import { userReduser } from "./userSlice";
export let store =configureStore({
    reducer:{
        user:userReduser
    }
})