import { createAction } from "@reduxjs/toolkit";
import { MODULE_NAME } from "../strings";

export const incrementAction = createAction(`${MODULE_NAME}/incrementAction`);

export const decrementAction = createAction(`${MODULE_NAME}/decrementAction`);
