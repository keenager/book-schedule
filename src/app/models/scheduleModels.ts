import { PlanType } from "../types/scheduleTypes";

export class Schedule {
  _date: string;
  _pagePlanOrigin: number | undefined;
  _pagePlanModified: number | undefined;
  _pageDone: number | undefined;
  constructor(
    date: string,
    pagePlanOrigin: number | undefined,
    pageplanModified: number | undefined,
    pageDone: number | undefined
  ) {
    this._date = date;
    this._pagePlanOrigin = pagePlanOrigin;
    this._pagePlanModified = pageplanModified;
    this._pageDone = pageDone;
  }

  get date() {
    return this._date;
  }
  get pagePlanOrigin() {
    return this._pagePlanOrigin;
  }
  get pagePlanModified() {
    return this._pagePlanModified;
  }
  get pageDone(): number | undefined {
    return this._pageDone;
  }
  set pageDone(page: number) {
    this._pageDone = page;
  }

  toArray() {
    return [
      this._date,
      this._pagePlanOrigin,
      this._pagePlanModified,
      this._pageDone,
    ];
  }
  toObj() {
    return {
      date: this._date,
      pagePlanOrigin: this._pagePlanOrigin,
      pagePlanModified: this._pagePlanModified,
      pageDone: this._pageDone,
    };
  }
}

export const blankPlan: PlanType = {
  title: "",
  totalPage: 0,
  dailyPage: 0,
  startDate: "",
};

export const initialState: {
  bookList: string[];
  plan: PlanType;
  scheduleList: Schedule[];
} = {
  bookList: [],
  plan: blankPlan,
  scheduleList: [],
};
