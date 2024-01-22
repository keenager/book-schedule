import { Schedule } from "../models/scheduleModels";
import { DataType, PlanType } from "../types/scheduleTypes";
import { createSchedule } from "../utils/scheduleUtils";

export default function ScheduleDetail({
  plan,
  list,
}: {
  plan: PlanType;
  list: Schedule[];
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

  return (
    <>
      {isValidPlan && (
        <div>{`<총 ${totalPage}페이지, 하루 ${dailyPage}페이지>`}</div>
      )}
      <div>
        {list.map((d, i) => (
          <ScheduleItem key={i} data={d} />
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

function ScheduleItem({ data }: { data: Schedule }) {
  return (
    <div>
      날짜 {data.date} 계획 {data.pagePlan} 실행 {data.pageExecute}
    </div>
  );
}
