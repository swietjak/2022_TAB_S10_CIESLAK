import { createAsyncThunk } from "@reduxjs/toolkit";
import Auth, { LoginParams } from "shared/services/Auth";
import { NAMESPACE } from "shared/strings";

const auth = new Auth();

export const login = createAsyncThunk(
  `${NAMESPACE}/login`,
  (payload: LoginParams) => auth.login(payload)
);
