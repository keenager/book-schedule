import { Schedule } from "../models/scheduleModels";
import { ActionType } from "../types/scheduleTypes";
import { createSchedule } from "./scheduleUtils";

export const initialSchedule: Schedule[] = [];

export const scheduleReducer = (
  state: typeof initialSchedule,
  action: ActionType
) => {
  switch (action.type) {
    case "create":
      if (!action.plan) throw new Error("put plan when creating schedule...");
      return createSchedule(action.plan);
    case "load":
      if (!action.schedules)
        throw new Error("put schedule when loading schedule...");
      return action.schedules;
    default:
      throw new Error("Invalid action type...");
  }
};
