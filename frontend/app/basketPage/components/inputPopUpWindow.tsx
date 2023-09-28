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
    <div className="flex items-center justify-center">
      <input
        className="h-10 w-full rounded border border-black pl-5 text-lg"
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
