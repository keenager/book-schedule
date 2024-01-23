import { Dispatch, SetStateAction } from "react";
import { PlanType } from "../types/scheduleTypes";
import { Schedule } from "../models/scheduleModels";
import { fromObjListToClassList } from "../utils/scheduleUtils";

export default function BookList({
  list,
  updatePlan,
  updateList,
  updateLoading,
}: {
  list: string[];
  updatePlan: Dispatch<SetStateAction<PlanType>>;
  updateList: Dispatch<SetStateAction<Schedule[]>>;
  updateLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const loadScheduleHandler = (title: string) => {
    const savedData = JSON.parse(localStorage.getItem("bookSchedule")!);
    const { totalPage, dailyPage, schedules } = savedData[title];
    updatePlan({ title, totalPage: +totalPage, dailyPage: +dailyPage });
    updateList(fromObjListToClassList(schedules));
    updateLoading(true);
  };
  return (
    <div className="w-48 overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>책 이름</th>
          </tr>
        </thead>
        <tbody>
          {list.map((el, i) => (
            <tr
              key={i}
              className="cursor-pointer"
              onClick={loadScheduleHandler.bind(null, el)}
            >
              <th>{i + 1}</th>
              <td>{el}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
