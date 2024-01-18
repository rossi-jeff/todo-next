"use client";
import { useState } from "react";

export default function SignInDialog({
  cancel,
  signIn,
}: {
  cancel: Function;
  signIn: Function;
}) {
  const [state, setState] = useState<{ UserName: string; PassWord: string }>({
    UserName: "",
    PassWord: "",
  });
  const cancelClicked = () => cancel();
  const signInClicked = () => {
    signIn({ ...state });
  };
  const handleChange = (ev: any) => {
    const { name, value } = ev.target;
    const update = {
      ...state,
      [name]: value,
    };
    setState(update);
  };
  return (
    <div id="sign-in-dialog" className="dialog">
      <div className="dialog-header">
        <h3>Sign In</h3>
      </div>
      <div className="dialog-content">
        <div className="field">
          <label htmlFor="UserName" className="block">
            User Name
          </label>
          <input
            type="text"
            name="UserName"
            className="w-full"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="PassWord" className="block">
            PassWord
          </label>
          <input
            type="password"
            name="PassWord"
            className="w-full"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={cancelClicked}>Cancel</button>
        <button onClick={signInClicked}>Sign In</button>
      </div>
    </div>
  );
}
