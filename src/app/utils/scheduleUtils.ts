import { Schedule } from "../models/scheduleModels";
import { PlanType, ScheduleObjType } from "../types/scheduleTypes";

export const createSchedule = ({ totalPage, dailyPage }: PlanType) => {
  let result: Schedule[] = [];
  const date = new Date();
  let page = dailyPage;

  while (page < totalPage + dailyPage) {
    if (page > totalPage) page = totalPage;
    result.push(
      new Schedule(date.toISOString().split("T")[0], page, page, undefined)
    );
    date.setDate(date.getDate() + 1);
    page += dailyPage;
  }

  return result;
};

export const updateSchedule = (
  plan: PlanType,
  prevSchedule: Schedule[],
  todayStr: string,
  idxOfToday: number,
  pageDoneToday: number
) => {
  const { totalPage, dailyPage } = plan;
  let { pagePlanOrigin, pagePlanModified } = prevSchedule[idxOfToday].toObj();

  prevSchedule[idxOfToday].pageDone = pageDoneToday;

  //현재 rowIndex 이후의 리스트를 새로 생성
  const newSubList: Schedule[] = [];
  const date = new Date(todayStr);
  let isRightAfterToday = true;
  let scheduleOfYesterday = prevSchedule[idxOfToday - 1];
  let idxOfCurrent = idxOfToday;

  do {
    // 날짜 증가
    date.setDate(date.getDate() + 1);
    // 원래 계획 처리
    if (pagePlanOrigin === undefined || pagePlanOrigin === totalPage) {
      pagePlanOrigin = undefined;
    } else {
      if (pagePlanOrigin < totalPage) {
        pagePlanOrigin += dailyPage;
      }
      if (pagePlanOrigin > totalPage) {
        pagePlanOrigin = totalPage;
      }
    }
    // 수정된 계획 처리
    if (pagePlanModified === undefined || pagePlanModified === totalPage) {
      pagePlanModified = undefined;
    } else {
      if (pagePlanModified < totalPage) {
        if (isRightAfterToday) {
          pagePlanModified = pageDoneToday + dailyPage;
          isRightAfterToday = false;
        } else {
          pagePlanModified += dailyPage;
        }
      }
      if (pagePlanModified > totalPage) {
        pagePlanModified = totalPage;
      }
    }
    // 새 배열에 추가
    newSubList.push(
      new Schedule(
        date.toISOString().split("T")[0],
        pagePlanOrigin,
        pagePlanModified,
        undefined
      )
    );
  } while (
    !(pagePlanOrigin === totalPage && pagePlanModified === totalPage) &&
    !(pagePlanOrigin === totalPage && pagePlanModified === undefined) &&
    !(pagePlanOrigin === undefined && pagePlanModified === totalPage) &&
    !(pagePlanOrigin === undefined && pagePlanModified === undefined)
  );

  // rowIndex 이후 부분을 새로 만든 배열로 대체
  const newSchedule = [...prevSchedule.slice(0, idxOfToday + 1), ...newSubList];
  return newSchedule;
};

export const fromObjListToClassList = (obj: ScheduleObjType[]) => {
  return obj.map(
    (el) =>
      new Schedule(el.date, el.pagePlanOrigin, el.pagePlanModified, el.pageDone)
  );
};
