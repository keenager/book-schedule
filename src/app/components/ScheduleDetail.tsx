import { Dispatch, FormEvent, SetStateAction } from "react";
import { Schedule } from "../models/scheduleModels";
import { DataType, PlanType } from "../types/scheduleTypes";
import { updateSchedule } from "../utils/scheduleUtils";

export default function ScheduleDetail({
  plan,
  list,
  updateList,
  updateLoading,
}: {
  plan: PlanType;
  list: Schedule[];
  updateList: Dispatch<SetStateAction<Schedule[]>>;
  updateLoading: Dispatch<SetStateAction<boolean>>;
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

  const recalc = (
    before: Schedule | undefined,
    idx: number,
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    //@ts-ignore
    const value = +e.target!.pageExecute.value;
    if (before && value < before.pageExecute!) {
      alert("전날보다 더 앞 페이지를 입력할 수 없습니다.");
      return;
    }
    const newSchedule = updateSchedule(plan, list, idx, value);
    updateLoading(true);
    updateList(newSchedule);
  };

  return (
    <>
      {isValidPlan && (
        <div>{`<총 ${totalPage}페이지, 하루 ${dailyPage}페이지>`}</div>
      )}
      <div>
        {list.map((d, i) => (
          <ScheduleItem
            key={i}
            recalc={recalc}
            plan={plan}
            before={list[i - 1]}
            data={d}
            idx={i}
          />
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
  plan,
  before,
  data,
  idx,
  recalc,
}: {
  plan: PlanType;
  before: Schedule | undefined;
  data: Schedule;
  idx: number;
  recalc: (
    before: Schedule | undefined,
    idx: number,
    e: FormEvent<HTMLFormElement>
  ) => void;
}) {
  const { date, pagePlanOrigin, pagePlanModified, pageExecute } = data;

  const modifyPart =
    before &&
    (before.pageExecute === plan.totalPage ||
      (before.pagePlanModified === plan.totalPage &&
        before.pageExecute === undefined))
      ? ""
      : `수정된 계획 ${pagePlanModified}`;

  const executePart =
    pageExecute !== undefined && pageExecute > 0 ? (
      `실행 ${pageExecute}`
    ) : before?.pageExecute === plan.totalPage ? (
      ""
    ) : (
      <>
        실행{" "}
        <form onSubmit={recalc.bind(null, before, idx)}>
          <input type="number" name="pageExecute" className="w-2/3" />
          <button className="btn btn-xs btn-primary">다시 계산</button>
        </form>
      </>
    );

  return (
    <div className="grid grid-cols-4 gap-1">
      <span>날짜 {date}</span>
      <span>계획 {pagePlanOrigin}</span>
      <span>{modifyPart}</span>
      <span>{executePart}</span>
    </div>
  );
}
