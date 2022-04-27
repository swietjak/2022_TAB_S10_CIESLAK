import { RootState } from "app/App.store";

export const getDemoNumber = (state: RootState) => state.home.demoNumber;
