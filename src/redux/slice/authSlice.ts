import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {LogInFormType, SignUpFormType} from '@/constant/validation/authSchema';
import {User, UserRole} from '@/types/entity';
import {removeToken} from '@/utils/tokenHelper';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User & {role: UserRole};
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      removeToken();
      state.isAuthenticated = false;
      state.user = undefined;
    },
    handleError(state, action) {
      const error = action.payload;
      state.isLoading = false;
      toast.error(error);
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login(state, action: PayloadAction<LogInFormType>) {
      state.isAuthenticated = false;
      state.isLoading = true;
    },
    loginSuccess(state) {
      state.isAuthenticated = true;
      state.isLoading = false;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signup(state, action: PayloadAction<SignUpFormType>) {
      state.isLoading = true;
    },
    signupSuccess(state) {
      state.isLoading = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
