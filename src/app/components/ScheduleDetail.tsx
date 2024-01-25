import { Schedule } from "../models/scheduleModels";

export default function ScheduleDetail({ list }: { list: Schedule[] }) {
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
