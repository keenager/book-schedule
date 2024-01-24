import { Schedule } from "../models/scheduleModels";
import { PlanType, ScheduleObjType } from "../types/scheduleTypes";

export const createSchedule = ({ totalPage, dailyPage }: PlanType) => {
  let result: Schedule[] = [];
  const date = new Date();
  let page = dailyPage;

  while (page < totalPage + dailyPage) {
    if (page > totalPage) page = totalPage;
    result.push(
      new Schedule(date.toLocaleDateString(), page, undefined, undefined),
    );
    date.setDate(date.getDate() + 1);
    page += dailyPage;
  }

  return result;
};

export const updateSchedule = (
  plan: PlanType,
  prevSchedule: Schedule[],
  // idx: number,
  today: string,
  pageDone: number,
) => {
  const idx = prevSchedule.findIndex((schedule) => schedule.date === today);
  let { pagePlanOrigin, pagePlanModified } = prevSchedule[idx].toObj();

  prevSchedule[idx].pageDone =
    pageDone > plan.totalPage ? plan.totalPage : pageDone;

  if (pagePlanModified === pageDone) {
    return prevSchedule;
  }

  const { totalPage, dailyPage } = plan;

  //현재 rowIndex 이후의 리스트를 새로 생성
  const newSubList: Schedule[] = [];
  // const newDate = new Date(date);
  const date = new date(today);
  let isRightAfter = true;

  do {
    date.setDate(date.getDate() + 1);

    if (pagePlanOrigin < totalPage) {
      pagePlanOrigin += dailyPage;
    }
    if (totalPage < pagePlanOrigin && pagePlanOrigin < totalPage + dailyPage) {
      pagePlanOrigin = totalPage;
    }
    if (pagePlanModified < totalPage) {
      if (isRightAfter) {
        pagePlanModified = pageDone + dailyPage;
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
        undefined,
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
        el.pageDone,
      ),
  );
};
