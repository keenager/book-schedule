export default function Plan({
  totalPage,
  dailyPage,
}: {
  totalPage: number;
  dailyPage: number;
}) {
  return (
    <div className="your-goal">
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
