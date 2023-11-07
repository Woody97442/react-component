import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

type InitialState = {
  allFrameWork: any;
};

const initialState: InitialState = {
  allFrameWork: [],
};

const frameworkSlice = createSlice({
  name: "allFrameWork",
  initialState,
  reducers: {
    getAllFramework: (state, action: PayloadAction<any[]>) => {
      if (action.payload) {
        state.allFrameWork = action.payload;
      }
    },
  },
});

export const { getAllFramework } = frameworkSlice.actions;
export const selectFramework = (state: RootState) => state.framework;
export default frameworkSlice.reducer;
