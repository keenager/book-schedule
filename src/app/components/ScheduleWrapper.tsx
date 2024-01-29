"use client";
import { useEffect, useReducer } from "react";
import { DataType } from "../types/scheduleTypes";
import { initialState } from "../models/scheduleModels";
import { scheduleReducer } from "../utils/reducer";
import BookList from "./book-list/BookList";
import ScheduleForm from "./form/ScheduleForm";
import Plan from "./plan-done/Plan";
import TodayDone from "./plan-done/TodayDone";
import ScheduleDetail from "./detail/ScheduleDetail";
import PlanAndDone from "./plan-done/PlanAndDone";

export default function ScheduleWrapper() {
  const [{ bookList, plan, scheduleList }, dispatch] = useReducer(
    scheduleReducer,
    initialState
  );
  const { title, totalPage, dailyPage } = plan;
  const isValidPlan = title.length > 0 && totalPage > 0 && dailyPage > 0;

  useEffect(() => {
    const savedData = localStorage.getItem("bookSchedule");
    if (savedData) {
      const loadedData: DataType = JSON.parse(savedData);
      dispatch({ type: "loadBookList", bookList: Object.keys(loadedData) });
    } else {
      dispatch({ type: "loadBookList", bookList: [] });
    }
  }, []);

  return (
    <>
      {bookList.length > 0 && (
        <BookList savedBooks={bookList} updateList={dispatch} />
      )}
      <ScheduleForm plan={plan} updateList={dispatch} />
      {isValidPlan && (
        <>
          <PlanAndDone>
            <Plan totalPage={totalPage} dailyPage={dailyPage} />
            <TodayDone updateList={dispatch} />
          </PlanAndDone>
          <ScheduleDetail list={scheduleList} />
          <div className="flex justify-end">
            <button
              className="btn btn-sm lg:btn-md btn-primary"
              onClick={dispatch.bind(null, { type: "save", scheduleList })}
            >
              저장
            </button>
          </div>
        </>
      )}
    </>
  );
}
