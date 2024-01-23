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

export const updateSchedule = (
  plan: PlanType,
  prevSchedule: Schedule[],
  idx: number,
  readPage: number,
) => {
  prevSchedule[idx].pageExecute = readPage;
  let plannedPage = prevSchedule[idx].pagePlanOrigin;

  if (plannedPage == readPage) {
    return prevSchedule;
  }

  //현재 rowIndex 이후의 리스트를 새로 생성
  const newSubList: Schedule[] = [];
  const date = new Date(prevSchedule[idx].date);
  const { totalPage, dailyPage } = plan;
  let modifiedPage = prevSchedule[idx].pagePlanModified;

  do {
    date.setDate(date.getDate() + 1);
    if (plannedPage < totalPage) {
      plannedPage += dailyPage;
    }
    if (totalPage < plannedPage && plannedPage < totalPage + dailyPage) {
      plannedPage = totalPage;
    }
    //TODO: readPage가 연속해서 같을 때, totalPage와 같을 때 무한반복되는 문제.
    if (modifiedPage < totalPage) {
      if (modifiedPage === prevSchedule[idx].pagePlanModified) {
        modifiedPage = readPage + dailyPage;
      } else {
        modifiedPage += dailyPage;
      }
    }
    if (totalPage < modifiedPage && modifiedPage < totalPage + dailyPage) {
      modifiedPage = totalPage;
    }
    newSubList.push(
      new Schedule(date.toLocaleDateString(), plannedPage, modifiedPage),
    );
  } while (plannedPage != totalPage || modifiedPage != totalPage);

  // 현재 rowIndex 이후 부분을 새로 만든 인덱스로 대체
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
