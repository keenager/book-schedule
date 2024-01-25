import { updateSchedule } from "../utils/scheduleUtils";

export default function TodayDone({
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
  // const todayStr = new Date().toLocaleDateString();
  const todayStr = "2024. 1. 26.";
  const recalc = (
    // before: Schedule | undefined,
    // idx: number,
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    // page validation
    //@ts-ignore
    const input = +e.target!.pageDone.value;
    const pageDone = input > plan.totalPage ? plan.totalPage : input;
    const idx = list.findIndex((schedule) => schedule.date === todayStr);
    const before = list[idx - 1];
    if (before && pageDone < before.pageDone!) {
      alert("전날보다 더 앞 페이지를 입력할 수 없습니다.");
      return;
    }
    // const newSchedule = updateSchedule(plan, list, idx, value);
    const newSchedule = updateSchedule(plan, list, todayStr, idx, pageDone);
    updateLoading(true);
    updateList([...newSchedule]);
  };

  return (
    <form onSubmit={recalc}>
      <label>
        <div className="label">
          <span className="label-text">오늘</span>
        </div>
        <input
          type="number"
          name="pageDone"
          className="input input-bordered input-sm lg:input-md w-full max-w-20"
        />
      </label>
      <button className="btn btn-xs btn-primary ml-2">적용</button>
    </form>
  );
}