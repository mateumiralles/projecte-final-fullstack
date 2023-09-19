import { HTMLInputTypeAttribute } from "react";

type InputUserForm = {
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
};

export default function InputUserForm({
  id,
  type,
  placeholder,
}: InputUserForm) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      // value={password}
      // onChange={(e) => setPassword(e.target.value)}
      className="w-full rounded border border-gray-400 bg-slate-50 px-3 py-2 focus:border-black focus:outline-none"
      required
    />
  );
}
