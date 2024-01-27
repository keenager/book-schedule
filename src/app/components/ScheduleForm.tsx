"use client";

import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ActionType, PlanType } from "../types/scheduleTypes";
import FormInput from "./FormInput";

export default function ScheduleForm({
  plan,
  updatePlan,
  updateList,
}: {
  plan: PlanType;
  updatePlan: Dispatch<SetStateAction<PlanType>>;
  updateList: Dispatch<ActionType>;
}) {
  const createHandler = (e: React.FormEvent<HTMLFormElement>) => {
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
    updatePlan(plan);
    updateList({ type: "create", plan });
  };

  const changeHandler = (name: string, e: ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.currentTarget.value;
    if (name !== "title") value = +value;
    updatePlan({ ...plan, [name]: value });
  };

  return (
    <section className="schedule-form">
      <form
        id="myForm"
        className="flex flex-col items-center "
        onSubmit={createHandler}
      >
        <FormInput
          label="책 이름"
          type="text"
          name="title"
          value={plan.title}
          onChange={changeHandler.bind(null, "title")}
        />
        <FormInput
          label="총 페이지"
          type="number"
          name="totalPage"
          value={plan.totalPage || undefined}
          onChange={changeHandler.bind(null, "totalPage")}
        />
        <FormInput
          label="하루 읽을 페이지"
          type="number"
          name="dailyPage"
          value={plan.dailyPage || undefined}
          onChange={changeHandler.bind(null, "dailyPage")}
        />
        <div className="flex justify-end my-3 w-full max-w-xs">
          <button className="btn btn-sm lg:btn-md btn-primary">만들기</button>
        </div>
      </form>
    </section>
  );
}
