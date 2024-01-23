import { Schedule } from "../models/scheduleModels";
import { PlanType, ScheduleObjType } from "../types/scheduleTypes";

export const createSchedule = ({ totalPage, dailyPage }: PlanType) => {
  let result: Schedule[] = [];
  const date = new Date();
  let page = dailyPage;

  while (page < totalPage + dailyPage) {
    if (page > totalPage) page = totalPage;
    result.push(new Schedule(date.toLocaleDateString(), page));
    date.setDate(date.getDate() + 1);
    page += dailyPage;
  }

  return result;
};

export const updateSchedule = (
  plan: PlanType,
  prevSchedule: Schedule[],
  idx: number,
  readPage: number,
) => {
  prevSchedule[idx].pageExecute =
    readPage > plan.totalPage ? plan.totalPage : readPage;
  let { date, pagePlanOrigin, pagePlanModified } = prevSchedule[idx].toObj();
  const { totalPage, dailyPage } = plan;

  if (pagePlanOrigin == readPage) {
    return prevSchedule;
  }

  //현재 rowIndex 이후의 리스트를 새로 생성
  const newSubList: Schedule[] = [];
  const newDate = new Date(date);
  let isRightAfter = true;

  do {
    newDate.setDate(newDate.getDate() + 1);
    if (pagePlanOrigin < totalPage) {
      pagePlanOrigin += dailyPage;
    }
    if (totalPage < pagePlanOrigin && pagePlanOrigin < totalPage + dailyPage) {
      pagePlanOrigin = totalPage;
    }
    if (pagePlanModified < totalPage) {
      if (isRightAfter) {
        pagePlanModified = readPage + dailyPage;
        isRightAfter = false;
      } else {
        pagePlanModified += dailyPage;
      }
    }
    if (totalPage < pagePlanModified) {
      pagePlanModified = totalPage;
    }
    newSubList.push(
      new Schedule(
        newDate.toLocaleDateString(),
        pagePlanOrigin,
        pagePlanModified,
      ),
    );
  } while (pagePlanOrigin != totalPage || pagePlanModified != totalPage);

  // rowIndex 이후 부분을 새로 만든 배열로 대체
  const newSchedule = [...prevSchedule.slice(0, idx + 1), ...newSubList];
  return newSchedule;
};

export const fromObjListToClassList = (obj: ScheduleObjType[]) => {
  return obj.map(
    (el) =>
      new Schedule(
        el.date,
        el.pagePlanOrigin,
        el.pagePlanModified,
        el.pageExecute,
      ),
  );
};
