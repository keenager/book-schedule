"use client";

import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { PlanType } from "../types/scheduleTypes";

export default function ScheduleForm({
  plan,
  updatePlan,
  updateLoading,
}: {
  plan: PlanType;
  updatePlan: Dispatch<SetStateAction<PlanType>>;
  updateLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const createHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myForm = document.getElementById("myForm")! as HTMLFormElement;
    const formData = new FormData(myForm);
    const temp = Object.fromEntries(formData);
    const plan = {
      ...temp,
      totalPage: Number(temp.totalPage),
      dailyPage: Number(temp.dailyPage),
    } as PlanType;
    updateLoading(false);
    updatePlan(plan);
  };

  const changeHandler = (name: string, e: ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.currentTarget.value;
    if (name !== "title") value = +value;
    updateLoading(true);
    updatePlan({ ...plan, [name]: value });
  };

  return (
    <form id="myForm" onSubmit={createHandler}>
      <div>
        <label>
          책 이름:
          <input
            type="text"
            name="title"
            value={plan.title}
            onChange={changeHandler.bind(null, "title")}
          />
        </label>
      </div>
      <div>
        <label>
          총 페이지:
          <input
            type="number"
            name="totalPage"
            value={plan.totalPage}
            onChange={changeHandler.bind(null, "totalPage")}
          />
        </label>
      </div>
      <div>
        <label>
          하루 읽을 페이지:
          <input
            type="number"
            name="dailyPage"
            value={plan.dailyPage}
            onChange={changeHandler.bind(null, "dailyPage")}
          />
        </label>
      </div>
      <button className="btn btn-xs btn-primary">만들기</button>
    </form>
  );
}
