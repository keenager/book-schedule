import { DispatchWithoutAction } from "react";

export default function RadioButton({
  label,
  checked,
  toggle,
}: {
  label: string;
  checked: boolean;
  toggle: DispatchWithoutAction;
}) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer gap-3">
        <span className="label-text">{label}</span>
        <input
          type="radio"
          name={`radio-${label}`}
          className="radio checked:bg-blue-500"
          checked={checked}
          onChange={toggle}
        />
      </label>
    </div>
  );
}
