"use client";
import { useEffect, useReducer, useState } from "react";
import { DataType, PlanType } from "../types/scheduleTypes";
import { initialSchedule, scheduleReducer } from "../utils/reducer";
import BookList from "./BookList";
import ScheduleForm from "./ScheduleForm";
import Plan from "./Plan";
import TodayDone from "./TodayDone";
import ScheduleDetail from "./ScheduleDetail";
import PlanAndDone from "./PlanAndDone";

export const blankPlan: PlanType = {
  title: "",
  totalPage: 0,
  dailyPage: 0,
  startDate: "",
};

export default function ScheduleWrapper() {
  const [plan, setPlan] = useState<PlanType>(blankPlan);
  const { title, totalPage, dailyPage } = plan;
  const isValidPlan = title.length > 0 && totalPage > 0 && dailyPage > 0;

  const [savedBooks, setSavedBooks] = useState<string[]>([]);
  const [scheduleList, setScheduleList] = useReducer(
    scheduleReducer,
    initialSchedule
  );

  const saveHandler = () => {
    const prev = JSON.parse(localStorage.getItem("bookSchedule") ?? "{}");
    const dataToSave: DataType = {
      ...prev,
      [title]: {
        totalPage,
        dailyPage,
        schedules: scheduleList.map((el) => el.toObj()),
      },
    };

    localStorage.setItem("bookSchedule", JSON.stringify(dataToSave));
    alert(`${title} 스케줄을 저장하였습니다.`);
    loadBooks();
  };

  const loadBooks = () => {
    const savedData = localStorage.getItem("bookSchedule");
    if (savedData) {
      const loadedData: DataType = JSON.parse(savedData);
      setSavedBooks(Object.keys(loadedData));
    } else {
      setSavedBooks([]);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <>
      {savedBooks.length > 0 && (
        <BookList
          list={savedBooks}
          updatePlan={setPlan}
          updateList={setScheduleList}
          loadBooks={loadBooks}
        />
      )}
      <ScheduleForm
        plan={plan}
        updatePlan={setPlan}
        updateList={setScheduleList}
      />
      {isValidPlan && (
        <>
          <PlanAndDone>
            <Plan totalPage={totalPage} dailyPage={dailyPage} />
            <TodayDone
              plan={plan}
              list={scheduleList}
              updateList={setScheduleList}
            />
          </PlanAndDone>
          <ScheduleDetail list={scheduleList} />
          <div className="flex justify-end">
            <button
              className="btn btn-sm lg:btn-md btn-primary"
              onClick={saveHandler}
            >
              저장
            </button>
          </div>
        </>
      )}
    </>
  );
}
