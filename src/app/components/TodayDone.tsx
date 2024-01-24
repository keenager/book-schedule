export default function TodayDone() {
  const today = new Date().toLocaleDateString();
  const recalc = (
    before: Schedule | undefined,
    idx: number,
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    //@ts-ignore
    const value = +e.target!.pageDone.value;
    console.log("today, value", today, value);
    if (before && value < before.pageDone!) {
      alert("전날보다 더 앞 페이지를 입력할 수 없습니다.");
      return;
    }
    // const newSchedule = updateSchedule(plan, list, idx, value);
    const newSchedule = updateSchedule(plan, list, today, value);
    updateLoading(true);
    updateList(newSchedule);
  };

  return (
    <form onSubmit={recalc.bind(null, undefined, 0)}>
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
