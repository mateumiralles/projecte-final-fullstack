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
      className="w-full px-3 py-2 border bg-slate-50 border-gray-400 rounded focus:outline-none focus:border-black"
      required
    />
  );
}
