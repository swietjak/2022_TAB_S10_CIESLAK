import { RootState } from "app/App.store";

export const getUserDataResource = (state: RootState) => state.common.userData;
