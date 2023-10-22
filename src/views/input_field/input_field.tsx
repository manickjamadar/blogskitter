import React from "react";
interface Props {
  id: string;
  type?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  errorMessage?: string | undefined;
  touched?: boolean | undefined;
  value?: string;
  label?: string;
}
const InputField: React.FC<Props> = ({
  id,
  errorMessage,
  onBlur,
  onChange,
  placeholder,
  touched,
  type = "text",
  value,
  label,
}) => {
  return (
    <div className="inputContainer">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`${errorMessage && touched ? "error" : "noError"}`}
      />
      {errorMessage && touched && (
        <p className="inputErrorMessage mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
