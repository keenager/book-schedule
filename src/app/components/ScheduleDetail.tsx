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
    <section className="schedule-detail my-3">
      {isValidPlan && <Goal totalPage={totalPage} dailyPage={dailyPage} />}
      <div className="schedule-table my-3 overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>날짜</th>
              <th>계획</th>
              <th>수정</th>
              <th>실행</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>
      {isValidPlan && (
        <div className="flex justify-end">
          <button
            className="btn btn-sm lg:btn-md btn-primary"
            onClick={saveHandler}
          >
            저장
          </button>
        </div>
      )}
    </section>
  );
}

function Goal({
  totalPage,
  dailyPage,
}: {
  totalPage: number;
  dailyPage: number;
}) {
  return (
    <div className="your-goal my-3 flex justify-center">
      <div className="stats shadow">
        <div className="stat place-items-center">
          <div className="stat-title">전체</div>
          <div className="stat-value">{totalPage}</div>
          <div className="stat-desc">page</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">하루</div>
          <div className="stat-value text-secondary">{dailyPage}</div>
          <div className="stat-desc text-secondary">page</div>
        </div>
      </div>
    </div>
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
      : pagePlanModified;

  const recalcForm = (
    <form onSubmit={recalc.bind(null, before, idx)}>
      <input
        type="number"
        name="pageExecute"
        className="input input-bordered input-sm lg:input-md w-full max-w-20"
      />
      <button className="btn btn-xs btn-primary">다시 계산</button>
    </form>
  );
  //TODO: 이 부분 해결하기.
  const executePart = !(before || pageExecute)
    ? recalcForm
    : !before && pageExecute
    ? pageExecute
    : before && !pageExecute
    ? recalcForm
    : before && pageExecute
    ? pageExecute
    : // : pageExecute !== undefined && pageExecute > 0
      // ? pageExecute
      // : before.pageExecute === undefined || before.pageExecute < plan.totalPage
      // ? recalcForm
      // : before.pagePlanModified === plan.totalPage
      // ? ""
      "";

  return (
    // <div className="grid grid-cols-4 gap-1">
    //   <span>날짜 {date}</span>
    //   <span>계획 {pagePlanOrigin}</span>
    //   <span>{modifyPart}</span>
    //   <span>{executePart}</span>
    // </div>
    <tr>
      <th>{idx + 1}</th>
      <td>{date}</td>
      <td>{pagePlanOrigin}</td>
      <td>{modifyPart}</td>
      <td>{executePart}</td>
    </tr>
  );
}
