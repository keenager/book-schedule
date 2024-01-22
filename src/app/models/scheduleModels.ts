export class Schedule {
  private _date = "";
  _pagePlan = 0;
  _pageExecute = 0;
  constructor(date: string, pagePlan: number, pageExecute: number) {
    this._date = date;
    this._pagePlan = pagePlan;
    this._pageExecute = pageExecute;
  }

  get date() {
    return this._date;
  }
  get pagePlan() {
    return this._pagePlan;
  }
  get pageExecute() {
    return this._pageExecute;
  }
  toArray() {
    return [this._date, this._pagePlan, this._pageExecute];
  }
  toObj() {
    return {
      date: this.date,
      pagePlan: this.pagePlan,
      pageExecute: this.pageExecute,
    };
  }
}
