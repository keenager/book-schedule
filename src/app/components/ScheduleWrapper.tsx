"use client";
import { useEffect, useState } from "react";
import { DataType, PlanType } from "../types/scheduleTypes";
import ScheduleForm from "./ScheduleForm";
import ScheduleGoal from "./ScheduleGoal";
import TodayDone from "./TodayDone";
import ScheduleDetail from "./ScheduleDetail";
import { createSchedule } from "../utils/scheduleUtils";
import BookList from "./BookList";
import { Schedule } from "../models/scheduleModels";

export default function ScheduleWrapper() {
  const [plan, setPlan] = useState<PlanType>({
    title: "",
    totalPage: 0,
    dailyPage: 0,
  });
  const { title, totalPage, dailyPage } = plan;
  const isValidPlan = title.length > 0 && totalPage > 0 && dailyPage > 0;

  const [savedBooks, setSavedBooks] = useState<string[]>([]);
  const [loadedList, setLoadedList] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let scheduleList: Schedule[] = [];

  if (isLoading) {
    scheduleList = loadedList;
  } else {
    scheduleList = createSchedule(plan);
  }

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
          updateList={setLoadedList}
          updateLoading={setIsLoading}
        />
      )}
      <ScheduleForm
        plan={plan}
        updatePlan={setPlan}
        updateLoading={setIsLoading}
      />
      {isValidPlan && (
        <>
          <div className="my-3 grid grid-cols-3 items-end">
            <div></div>
            <ScheduleGoal totalPage={totalPage} dailyPage={dailyPage} />
            <TodayDone />
          </div>
          <ScheduleDetail
            plan={plan}
            list={scheduleList}
            updateList={setLoadedList}
            updateLoading={setIsLoading}
          />

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
