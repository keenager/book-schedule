import { Dispatch } from "react";
import { ActionType } from "../../types/scheduleTypes";

export default function BookList({
  savedBooks,
  updateList,
}: {
  savedBooks: string[];
  updateList: Dispatch<ActionType>;
}) {
  const deleteHandler = (title: string) => {
    const isConfirmed = confirm(`${title} 책 스케줄을 삭제하시겠습니까?`);
    if (!isConfirmed) return;
    updateList({ type: "delete", title });
  };

  return (
    <section className="book-list my-6 overflow-x-auto flex justify-center">
      <table className="table w-48">
        <thead>
          <tr>
            <th></th>
            <th>책 이름</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {savedBooks.map((title, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              <td
                className="cursor-pointer"
                onClick={updateList.bind(null, {
                  type: "loadScheduleList",
                  title,
                })}
              >
                {title}
              </td>
              <td>
                <button
                  className="btn btn-xs"
                  onClick={deleteHandler.bind(null, title)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
