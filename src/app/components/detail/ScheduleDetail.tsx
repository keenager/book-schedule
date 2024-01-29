import { Schedule } from "../../models/scheduleModels";

export default function ScheduleDetail({ list }: { list: Schedule[] }) {
  return (
    <section className="schedule-detail my-3">
      <div className="schedule-table my-3 overflow-x-auto">
        <table className="table table-zebra text-center">
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
              <ScheduleItem key={i} data={d} idx={i} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ScheduleItem({ data, idx }: { data: Schedule; idx: number }) {
  const { date, pagePlanOrigin, pagePlanModified, pageDone } = data;
  const isToday = date === new Date().toISOString().split("T")[0];
  const isGood = pagePlanModified && pageDone && pagePlanModified <= pageDone;
  const isBad = pagePlanModified && pageDone && pagePlanModified > pageDone;
  const bgColor = isGood ? "bg-green-500" : isBad ? "bg-red-500" : "";
  return (
    <tr className={isToday ? "bg-blue-400" : ""}>
      <th className="rounded-l-lg">{idx + 1}</th>
      <td>{date}</td>
      <td>{pagePlanOrigin}</td>
      <td>{pagePlanModified}</td>
      <td className={`rounded-r-lg ${bgColor}`}>{pageDone}</td>
    </tr>
  );
}
