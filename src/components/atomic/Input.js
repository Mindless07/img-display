const Input = ({ label, placeholder, inputProps = {}, labelProps = {} }) => (
  <div className="flex flex-col justify-center gap-1">
    {label && (
      <label {...labelProps} className="px-2">
        {label}
      </label>
    )}
    <input
      className="border-2 decoration:none basis-1/10 px-2 border-grey:700 rounded-md"
      placeholder={placeholder}
      {...inputProps}
    />
  </div>
);

export default Input;
