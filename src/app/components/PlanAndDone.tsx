import React from "react";

export default function PlanAndDone({
  children,
}: {
  children: React.ReactNode;
}) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="my-3 flex gap-3">
      <div className="hidden sm:block sm:basis-1/3"></div>
      <div className="shrink flex justify-center basis-1/2 sm:basis-1/3">
        {childrenArray[0]}
      </div>
      <div className="flex place-content-end basis-1/2 sm:basis-1/3">
        {childrenArray[1]}
      </div>
    </div>
  );
}
