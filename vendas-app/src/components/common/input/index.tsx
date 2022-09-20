import { FormEvent, InputHTMLAttributes } from "react";
import { formatReal } from "app/util/money";
import { isNumber } from "util";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  columnClasses?: string;
  error?: string;
  formatter?: (value: string) => string;
}
export const Input: React.FC<InputProps> = ({
  id,
  label,
  columnClasses,
  error,
  formatter,
  onChange,
  ...inputProps
}: InputProps) => {
  const onInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.nome;

    const formatedValue = (formatter && formatter(value as string)) || value;

    onChange({
      ...event,
      target: {
        name,
        value: formatedValue,
      },
    });
  };

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
          onChange={onInputChange}
        />
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};

export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={formatReal} />;
};
