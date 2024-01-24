import { Schedule } from "../models/scheduleModels";

export type PlanType = {
  title: string;
  totalPage: number;
  dailyPage: number;
  startDate: string;
};

export type DataType = {
  [key: string]: {
    totalPage: string;
    dailyPage: string;
    schedules: Schedule[];
  };
};

export type ScheduleObjType = {
  date: string;
  pagePlanOrigin: number;
  pagePlanModified: number;
  pageExecute: number;
};
