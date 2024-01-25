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
  const recalc = (
    before: Schedule | undefined,
    idx: number,
    e: FormEvent<HTMLFormElement>,
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
                // recalc={recalc}
                // plan={plan}
                // before={list[i - 1]}
                data={d}
                idx={i}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ScheduleItem({
  // plan,
  // before,
  data,
  idx,
  // recalc,
}: {
  // plan: PlanType;
  // before: Schedule | undefined;
  data: Schedule;
  idx: number;
  // recalc: (
  //   before: Schedule | undefined,
  //   idx: number,
  //   e: FormEvent<HTMLFormElement>,
  // ) => void;
}) {
  const { date, pagePlanOrigin, pagePlanModified, pageDone } = data;

  // const modifyPart =
  //   before &&
  //   (before.pageDone === plan.totalPage ||
  //     (before.pagePlanModified === plan.totalPage &&
  //       before.pageDone === undefined))
  //     ? ""
  //     : pagePlanModified;

  //TODO: 이 부분 해결하기.
  // const executePart = !(before || pageExecute)
  //   ? recalcForm
  //   : !before && pageExecute
  //     ? pageExecute
  //     : before && !pageExecute
  //       ? recalcForm
  //       : before && pageExecute
  //         ? pageExecute
  //         : // : pageExecute !== undefined && pageExecute > 0
  //           // ? pageExecute
  //           // : before.pageExecute === undefined || before.pageExecute < plan.totalPage
  //           // ? recalcForm
  //           // : before.pagePlanModified === plan.totalPage
  //           // ? ""
  //           "";

  return (
    <tr>
      <th>{idx + 1}</th>
      <td>{date}</td>
      <td>{pagePlanOrigin}</td>
      <td>{pagePlanModified}</td>
      <td>{pageDone}</td>
    </tr>
  );
}
