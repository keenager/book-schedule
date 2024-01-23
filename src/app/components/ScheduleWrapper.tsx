"use client";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const savedData = localStorage.getItem("bookSchedule");
    if (savedData) {
      const loadedData: DataType = JSON.parse(savedData);
      setSavedBooks(Object.keys(loadedData));
    }
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
      <ScheduleDetail
        plan={plan}
        list={scheduleList}
        updateList={setLoadedList}
        updateLoading={setIsLoading}
      />
    </>
  );
}
