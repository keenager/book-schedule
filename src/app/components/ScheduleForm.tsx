"use client";

import { ChangeEvent, Dispatch, SetStateAction, useReducer } from "react";
import { ActionType, PlanType } from "../types/scheduleTypes";
import FormInput from "./FormInput";
import RadioButton from "./RadioButton";

export default function ScheduleForm({
  plan,
  updatePlan,
  updateList,
}: {
  plan: PlanType;
  updatePlan: Dispatch<SetStateAction<PlanType>>;
  updateList: Dispatch<ActionType>;
}) {
  const [dateMode, toggleMode] = useReducer((prev: boolean) => {
    return !prev;
  }, true);

  const createHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myForm = document.getElementById("myForm")! as HTMLFormElement;
    const formData = new FormData(myForm);
    const temp = Object.fromEntries(formData);

    const startDate = new Date().toISOString().split("T")[0];
    const endDate = temp.endDate?.toString();
    const period =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        1000 /
        60 /
        60 /
        24 +
      1;
    const totalPage = Number(temp.totalPage);
    const dailyPage = dateMode
      ? Math.ceil(totalPage / period)
      : Number(temp.dailyPage);

    const plan: PlanType = {
      title: temp.title.toString(),
      totalPage,
      dailyPage,
      startDate,
      endDate,
    };
    console.log(plan);
    updatePlan(plan);
    updateList({ type: "create", plan });
  };

  const changeHandler = (name: string, e: ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.currentTarget.value;
    if (name === "totalPage" || name === "dailyPage") value = +value;
    updatePlan({ ...plan, [name]: value });
  };

  return (
    <section className="schedule-form">
      <form
        id="myForm"
        className="flex flex-col items-center "
        onSubmit={createHandler}
      >
        <div className="flex gap-5">
          <RadioButton
            label="날짜 기준"
            checked={dateMode}
            toggle={toggleMode}
          />
          <RadioButton
            label="페이지 기준"
            checked={!dateMode}
            toggle={toggleMode}
          />
        </div>
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
        {dateMode ? (
          <FormInput
            label="언제까지"
            type="date"
            name="endDate"
            value={plan.endDate || undefined}
            onChange={changeHandler.bind(null, "endDate")}
          />
        ) : (
          <FormInput
            label="하루 읽을 페이지"
            type="number"
            name="dailyPage"
            value={plan.dailyPage || undefined}
            onChange={changeHandler.bind(null, "dailyPage")}
          />
        )}
        <div className="flex justify-end my-3 w-full max-w-xs">
          <button className="btn btn-sm lg:btn-md btn-primary">만들기</button>
        </div>
      </form>
    </section>
  );
}
