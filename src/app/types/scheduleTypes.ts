import { Schedule } from "../models/scheduleModels";

export type PlanType = {
  title: string;
  totalPage: number;
  dailyPage: number;
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
  pagePlan: number;
  pageExecute: number;
};
