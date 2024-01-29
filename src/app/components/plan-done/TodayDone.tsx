import { Dispatch, FormEvent } from "react";
import { ActionType } from "../../types/scheduleTypes";

export default function TodayDone({
  updateList,
}: {
  updateList: Dispatch<ActionType>;
}) {
  const recalc = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // page validation
    //@ts-ignore
    const pageDone = +e.target!.pageDone.value;
    if (pageDone < 0) {
      alert("올바른 값을 입력하세요.");
      return;
    }
    updateList({ type: "update", pageDone });
  };

  return (
    <form onSubmit={recalc} className="flex flex-wrap justify-end items-end">
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
      <button className="btn btn-sm lg:btn-md btn-primary ml-2">적용</button>
    </form>
  );
}
