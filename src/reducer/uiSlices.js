import { createSlice } from "@reduxjs/toolkit";
import { initialToggleStateCard } from "./initialsStates";

const uiSlices = createSlice({
    name: 'ui',
    initialState: initialToggleStateCard,
    reducers: {
        setOpenToggle(state) {
            state.cardIsVisible = !state.cardIsVisible
        }
    }
})

export default uiSlices