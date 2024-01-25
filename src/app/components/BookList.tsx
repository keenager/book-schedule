import { Dispatch, SetStateAction } from "react";
import { PlanType } from "../types/scheduleTypes";
import { Schedule } from "../models/scheduleModels";
import { fromObjListToClassList } from "../utils/scheduleUtils";
import { blankPlan } from "./ScheduleWrapper";

export default function BookList({
  list,
  updatePlan,
  updateList,
  updateLoading,
  loadBooks,
}: {
  list: string[];
  updatePlan: Dispatch<SetStateAction<PlanType>>;
  updateList: Dispatch<SetStateAction<Schedule[]>>;
  updateLoading: Dispatch<SetStateAction<boolean>>;
  loadBooks: () => void;
}) {
  const loadScheduleHandler = (title: string) => {
    const savedData = JSON.parse(localStorage.getItem("bookSchedule")!);
    const { totalPage, dailyPage, schedules } = savedData[title];
    updatePlan({
      title,
      totalPage: +totalPage,
      dailyPage: +dailyPage,
      startDate: schedules[0].date,
    });
    updateList(fromObjListToClassList(schedules));
    updateLoading(true);
  };

  const deleteHandler = (title: string) => {
    const isConfirmed = confirm(`${title} 책 스케줄을 삭제하시겠습니까?`);
    if (!isConfirmed) return;
    const savedData = JSON.parse(localStorage.getItem("bookSchedule") ?? "{}");
    console.log(savedData);
    delete savedData[title];
    localStorage.setItem("bookSchedule", JSON.stringify(savedData));
    const $inputs = document.querySelectorAll("input");
    $inputs.forEach((input) => (input.value = ""));
    updatePlan(blankPlan);
    updateList([]);
    loadBooks();
  };

  return (
    <section className="book-list my-6  overflow-x-auto flex justify-center">
      <table className="table w-48">
        <thead>
          <tr>
            <th></th>
            <th>책 이름</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((title, i) => (
            <tr
              key={i}
              className="cursor-pointer"
              onClick={loadScheduleHandler.bind(null, title)}
            >
              <th>{i + 1}</th>
              <td>{title}</td>
              <td>
                <button
                  className="btn btn-xs"
                  onClick={deleteHandler.bind(null, title)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
