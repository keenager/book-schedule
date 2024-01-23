"use client";
import { useState } from "react";
import { DataType, PlanType } from "../types/scheduleTypes";
import ScheduleForm from "./ScheduleForm";
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
  const [savedBooks, setSavedBooks] = useState<string[]>([]);
  const [loadedList, setLoadedList] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let scheduleList: Schedule[] = [];

  if (isLoading) {
    scheduleList = loadedList;
  } else {
    scheduleList = createSchedule(plan);
  }

  const loadBooksHandler = () => {
    const loadedData: DataType = JSON.parse(
      localStorage.getItem("bookSchedule") ?? "{}",
    );
    setSavedBooks(Object.keys(loadedData));
  };

  return (
    <>
      <button className="btn btn-xs btn-primary" onClick={loadBooksHandler}>
        불러오기
      </button>
      <BookList
        list={savedBooks}
        updatePlan={setPlan}
        updateList={setLoadedList}
        updateLoading={setIsLoading}
      />
      <ScheduleForm
        plan={plan}
        updatePlan={setPlan}
        updateLoading={setIsLoading}
      />
      <ScheduleDetail
        plan={plan}
        list={scheduleList}
        updateList={setLoadedList}
        updateLoading={setIsLoading}
      />
    </>
  );
}
