import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (value: any) => void;
  id: string;
  label: string;
  columnClasses?: string;
}
export const Input: React.FC<InputProps> = ({
  onChange,
  id,
  label,
  columnClasses,
  ...inputProps
}: InputProps) => {
  return (
    <div className={`field column ${columnClasses}`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          className="input"
          id={id}
          {...inputProps}
          onChange={(event) => {
            if (onChange) {
              onChange(event.target.value);
            }
          }}
        />
      </div>
    </div>
  );
};
