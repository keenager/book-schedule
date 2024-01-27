import { Schedule } from "../models/scheduleModels";

export type PlanType = {
  title: string;
  totalPage: number;
  dailyPage: number;
  startDate: string;
};

export type DataType = {
  [title: string]: {
    totalPage: string;
    dailyPage: string;
    schedules: Schedule[];
  };
};

export type ScheduleObjType = {
  date: string;
  pagePlanOrigin: number | undefined;
  pagePlanModified: number | undefined;
  pageDone: number | undefined;
};

export type ActionType = {
  type: "create" | "load";
  plan?: PlanType;
  schedules?: Schedule[];
};
