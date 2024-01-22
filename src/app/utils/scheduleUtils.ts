import { Schedule } from "../models/scheduleModels";
import { PlanType, ScheduleObjType } from "../types/scheduleTypes";

export const createSchedule = ({ totalPage, dailyPage }: PlanType) => {
  let result: Schedule[] = [];
  const date = new Date();
  let page = dailyPage;

  while (page < totalPage + dailyPage) {
    if (page > totalPage) page = totalPage;
    result.push(new Schedule(date.toLocaleDateString(), page, 0));
    date.setDate(date.getDate() + 1);
    page += dailyPage;
  }

  return result;
};

export const fromObjListToClassList = (obj: ScheduleObjType[]) => {
  return obj.map((el) => new Schedule(el.date, el.pagePlan, el.pageExecute));
};
