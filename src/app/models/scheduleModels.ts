export class Schedule {
  private _date = "";
  _pagePlanOrigin = 0;
  _pagePlanModified = 0;
  _pageExecute;
  constructor(
    date: string,
    pagePlanOrigin: number,
    pageplanModified: number | undefined,
    pageExecute: number | undefined,
  ) {
    this._date = date;
    this._pagePlanOrigin = pagePlanOrigin;
    this._pagePlanModified = pageplanModified ?? pagePlanOrigin;
    this._pageExecute = pageExecute;
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
  get pageExecute() {
    return this._pageExecute;
  }

  set pageExecute(page: number) {
    this._pageExecute = page;
  }

  toArray() {
    return [
      this._date,
      this._pagePlanOrigin,
      this._pagePlanModified,
      this._pageExecute,
    ];
  }
  toObj() {
    return {
      date: this._date,
      pagePlanOrigin: this._pagePlanOrigin,
      pagePlanModified: this._pagePlanModified,
      pageExecute: this._pageExecute,
    };
  }
}
