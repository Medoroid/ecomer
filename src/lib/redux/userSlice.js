import { createSlice } from "@reduxjs/toolkit";

let userSlice = createSlice({
    name:"userSlice",
    initialState:{
        username:"medo",
        age:20,
        jop:"frontend"
    },
    reducers:{
        increseAge:()=>{
            console.log('hi')
        }
    }
}
)
export let userReduser = userSlice.reducer