import { FormEvent, InputHTMLAttributes } from "react";
import { formatReal } from "app/util/money";
import { isNumber } from "util";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (value: any) => void;
  id: string;
  label: string;
  columnClasses?: string;
  currency?: boolean;
  error?: string;
}
export const Input: React.FC<InputProps> = ({
  onChange,
  id,
  label,
  columnClasses,
  error,
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
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};
