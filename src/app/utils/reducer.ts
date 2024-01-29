import { blankPlan, initialState } from "../models/scheduleModels";
import { ActionType, DataType } from "../types/scheduleTypes";
import {
  createSchedule,
  fromObjListToClassList,
  updateSchedule,
} from "./scheduleUtils";

export const scheduleReducer = (
  state: typeof initialState,
  action: ActionType
) => {
  switch (action.type) {
    case "create":
      const newPlan = { ...state.plan };
      const formData = action.formDataObj;

      newPlan.title = formData.title.toString();
      newPlan.startDate = new Date().toISOString().split("T")[0];
      newPlan.endDate = formData.endDate?.toString();

      const start = new Date(newPlan.startDate).getTime();
      const end = new Date(newPlan.endDate).getTime();
      if (start > end) {
        alert("오늘보다 앞선 날을 선택할 수 없습니다.");
        return state;
      }

      const period = (end - start) / 1000 / 60 / 60 / 24 + 1;
      newPlan.totalPage = Number(formData.totalPage);
      newPlan.dailyPage = newPlan.endDate
        ? Math.ceil(newPlan.totalPage / period)
        : Number(formData.dailyPage);

      const newSchedule = createSchedule(newPlan);
      return { ...state, plan: newPlan, scheduleList: newSchedule };

    case "save":
      const prev = JSON.parse(localStorage.getItem("bookSchedule") ?? "{}");
      const dataToSave: DataType = {
        ...prev,
        [state.plan.title]: {
          totalPage: state.plan.totalPage,
          dailyPage: state.plan.dailyPage,
          scheduleList: state.scheduleList.map((schedule) => schedule.toObj()),
        },
      };

      localStorage.setItem("bookSchedule", JSON.stringify(dataToSave));
      alert(`${state.plan.title} 스케줄을 저장하였습니다.`);

      return { ...state, bookList: Object.keys(dataToSave) };

    case "loadBookList":
      return { ...state, bookList: action.bookList };

    case "loadScheduleList":
      const title = action.title;
      const savedData = JSON.parse(localStorage.getItem("bookSchedule")!);
      const { totalPage, dailyPage, scheduleList } = savedData[title];
      const loadedPlan = {
        title,
        totalPage: +totalPage,
        dailyPage: +dailyPage,
        startDate: scheduleList[0].date,
      };
      const loadedScheduleList = fromObjListToClassList(scheduleList);

      return { ...state, plan: loadedPlan, scheduleList: loadedScheduleList };

    case "updatePlan":
      return { ...state, plan: action.plan };

    case "update":
      const todayStr = new Date().toISOString().split("T")[0];
      const completeDay = state.scheduleList.findLast(
        (schedule) => schedule.pageDone === state.plan.totalPage
      )?.date;
      if (completeDay && new Date(todayStr) > new Date(completeDay)) {
        alert("이미 완료한 스케줄입니다.");
        return state;
      }

      const pageDone =
        action.pageDone > state.plan.totalPage
          ? state.plan.totalPage
          : action.pageDone;
      const idx = state.scheduleList.findIndex(
        (schedule) => schedule.date === todayStr
      );
      const before = state.scheduleList[idx - 1];
      if (before && pageDone < before.pageDone!) {
        alert("전날보다 더 앞 페이지를 입력할 수 없습니다.");
        return state;
      }

      const updatedSchedule = updateSchedule(
        state.plan,
        state.scheduleList,
        todayStr,
        idx,
        pageDone
      );

      return { ...state, scheduleList: updatedSchedule };

    case "delete":
      const prevData: DataType = JSON.parse(
        localStorage.getItem("bookSchedule") ?? "{}"
      );
      const { [action.title!]: target, ...newData } = prevData;
      localStorage.setItem("bookSchedule", JSON.stringify(newData));
      return {
        bookList: Object.keys(newData),
        plan: { ...blankPlan },
        scheduleList: [],
      };

    default:
      throw new Error("Invalid action type...");
  }
};
