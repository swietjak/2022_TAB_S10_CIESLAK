import { createAsyncThunk } from "@reduxjs/toolkit";
import Workers from "shared/services/Workers";
import { MODULE_NAME } from "../strings";

const workers = new Workers();

export const getWorkersStatistics = createAsyncThunk(
  `${MODULE_NAME}/getWorkersStatistics`,
  () => workers.getWorkersStatistics()
);
