/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponse, INewUser, IUser } from "../../../types/globalTypes";

interface IUserState {
  userId: string;
  accessToken: string | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null | object;
}

const initialUserState: IUserState = {
  userId: '',
  accessToken: null,
  isLoading: false,
  isError: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ email, password, confirmPassword }: INewUser) => {
    const response = await fetch(`https://book-api-shihab17.vercel.app/api/v1/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    const apiResponse = await response.json();
    if (!response.ok) {
      throw new Error(apiResponse?.message);
    }
    return apiResponse;
  }
);

export const login = createAsyncThunk(
  "user/loginUser",
  async (userData: IUser) => {
    const response = await fetch(`https://book-api-shihab17.vercel.app/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const apiResponse: IApiResponse = await response.json();
    if (!response.ok) {
      throw new Error(apiResponse.message); // Throw the error directly instead of using rejectWithValue
    }
    return apiResponse.data;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.userId = action.payload.userId;
        state.error = null;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.accessToken = null;
        state.userId = '';
        state.error = action.payload ?? "An error occurred during login.";
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;
