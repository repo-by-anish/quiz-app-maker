import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3500/answere"
const initialState = {
    name: "answeres",
    answeres: [],
    status: "idle"
}


export const addAnswere = createAsyncThunk("answere/addAnswere", async (initialAnswere) => {
    try {
        const response = await axios.post(API_URL, initialAnswere);
        return response.data;

    } catch (err) {
        return { message: "couldn't save Answere" + err }
    }
})

export const updateAns = createAsyncThunk("answere/updateAns", async (updateData) => {
    try {
        const response = await axios.patch(API_URL, updateData);
        if (response) {
            return response.data;
        }
    } catch (err) {
        return { message: "couldn't save Answere" + err }
    }
})

const answereSlice = createSlice({
    name: "answeres",
    initialState,
    reducers: {}
})


export default answereSlice.reducer;

