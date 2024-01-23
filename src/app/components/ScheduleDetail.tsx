import { Dispatch, FormEvent, SetStateAction, useRef } from "react";
import { Schedule } from "../models/scheduleModels";
import { DataType, PlanType } from "../types/scheduleTypes";
import { createSchedule, updateSchedule } from "../utils/scheduleUtils";

export default function ScheduleDetail({
  plan,
  list,
  updateList,
}: {
  plan: PlanType;
  list: Schedule[];
  updateList: Dispatch<SetStateAction<Schedule[]>>;
}) {
  const { title, totalPage, dailyPage } = plan;
  const isValidPlan = title && totalPage && dailyPage;

  const saveHandler = () => {
    const prev = JSON.parse(localStorage.getItem("bookSchedule") ?? "{}");
    const dataToSave: DataType = {
      ...prev,
      [title]: {
        totalPage,
        dailyPage,
        schedules: list.map((el) => el.toObj()),
      },
    };

    localStorage.setItem("bookSchedule", JSON.stringify(dataToSave));
    alert(`${title} 스케줄을 저장하였습니다.`);
  };

  const recalc = (idx: number, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("plan", plan);
    console.log("prev", list);
    console.log("idx", idx);
    console.log("readPage", e.target!.pageExecute.value);
    const newSchedule = updateSchedule(
      plan,
      list,
      idx,
      +e.target!.pageExecute.value,
    );
    updateList(newSchedule);
  };

  return (
    <>
      {isValidPlan && (
        <div>{`<총 ${totalPage}페이지, 하루 ${dailyPage}페이지>`}</div>
      )}
      <div>
        {list.map((d, i) => (
          <ScheduleItem key={i} recalc={recalc} data={d} idx={i} />
        ))}
      </div>
      {isValidPlan && (
        <button className="btn btn-xs btn-primary" onClick={saveHandler}>
          저장
        </button>
      )}
    </>
  );
}

function ScheduleItem({
  data,
  idx,
  recalc,
}: {
  data: Schedule;
  idx: number;
  recalc: (idx: number, e: FormEvent<HTMLFormElement>) => void;
}) {
  const exeDiv =
    data.pageExecute > 0 ? (
      data.pageExecute
    ) : (
      <form onSubmit={recalc.bind(null, idx)}>
        <input type="number" name="pageExecute" className="w-2/3" />
        <button className="btn btn-xs btn-primary">다시 계산</button>
      </form>
    );
  return (
    <div className="grid grid-cols-4 gap-1">
      <span>날짜 {data.date}</span>
      <span>계획 {data.pagePlanOrigin}</span>
      <span>수정된 계획 {data.pagePlanModified}</span>
      <span>실행 {exeDiv}</span>
    </div>
  );
}
