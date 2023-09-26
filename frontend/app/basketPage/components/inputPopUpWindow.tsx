type InputPopUpWindowProps = {
  type: string;
  name: string;
  placeholder: string;
  value: any;
  handler: React.ChangeEventHandler<HTMLInputElement>;
  maxLength?: number;
};

export default function InputPopUpWindow({
  type,
  name,
  placeholder,
  value,
  handler,
  maxLength,
}: InputPopUpWindowProps) {
  return (
    <div className="flex justify-center items-center">
      <input
        className="h-10 w-full pl-5 text-lg rounded border border-black"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handler}
        maxLength={maxLength}
      />
    </div>
  );
}
