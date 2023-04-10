import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://black-pigeon-tie.cyclic.app/answere"
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
        return response.data;
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

