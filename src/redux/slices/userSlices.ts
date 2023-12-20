import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiLogin, apiRegister } from "../../api/services";
import { UserInfo } from "../../modules/shared/model/user";
import { RootState } from "../store";

export interface UserState {
    userInfo: UserInfo | null,
    loadding: boolean,
    isLogin: boolean
}
const initialState: UserState = {
    userInfo: null,
    loadding: false,
    isLogin: false
}

export const requestRegister = createAsyncThunk('user/register', async (props: { account: string, password: string, email: string, phone: string, address: string }) => {
    const res = await apiRegister(props);
    return res.data
})
export const requestLogin = createAsyncThunk('user/login', async (props: { account: string, password: string }) => {
    const res = await apiLogin(props);
    return res.data
})
export const requestLogout = createAsyncThunk('user/login', async () => {
    // const res = await apiLogin(props);
    // return res.data
})


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(requestRegister.pending, (state) => {
            state.loadding = true
        })
        builder.addCase(requestRegister.fulfilled, (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
        })
        builder.addCase(requestLogin.pending, (state) => {
            state.loadding = true
        })
        builder.addCase(requestLogin.fulfilled, (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
        })
    }
})
export const userState = (state: RootState) => state.userState;
export const { setIsLogin } = userSlice.actions;
export default userSlice.reducer;