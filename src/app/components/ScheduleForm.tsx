"use client";

import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
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
  const createHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myForm = document.getElementById("myForm")! as HTMLFormElement;
    const formData = new FormData(myForm);
    const temp = Object.fromEntries(formData);
    const plan: PlanType = {
      title: temp.title.toString(),
      totalPage: Number(temp.totalPage),
      dailyPage: Number(temp.dailyPage),
      startDate: new Date().toLocaleDateString(),
    };
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
    <section className="schedule-form">
      <form
        id="myForm"
        className="flex flex-col items-center "
        onSubmit={createHandler}
      >
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">책 이름</span>
          </div>
          <input
            type="text"
            className="input input-bordered input-sm lg:input-md w-full max-w-xs"
            name="title"
            value={plan.title}
            onChange={changeHandler.bind(null, "title")}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">총 페이지</span>
          </div>
          <input
            type="number"
            className="input input-bordered input-sm lg:input-md w-full max-w-xs"
            name="totalPage"
            value={plan.totalPage || undefined}
            onChange={changeHandler.bind(null, "totalPage")}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">하루 읽을 페이지</span>
          </div>
          <input
            type="number"
            className="input input-bordered input-sm lg:input-md w-full max-w-xs"
            name="dailyPage"
            value={plan.dailyPage || undefined}
            onChange={changeHandler.bind(null, "dailyPage")}
          />
        </label>
        <div className="flex justify-end my-3 w-full max-w-xs">
          <button className="btn btn-sm lg:btn-md btn-primary">만들기</button>
        </div>
      </form>
    </section>
  );
}
