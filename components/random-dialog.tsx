"use client";
import { useState } from "react";

export default function RandomDialog({
  userNames,
  cancel,
  randomSignIn,
}: {
  userNames: string[];
  cancel: Function;
  randomSignIn: Function;
}) {
  const [state, setState] = useState<{ UserName: string }>({ UserName: "" });
  const cancelClicked = () => cancel();
  const randomClicked = () => {
    randomSignIn({ ...state });
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
    <div id="random-dialog" className="dialog">
      <div className="dialog-header">
        <h3>Sign In Random</h3>
      </div>
      <div className="dialog-content">
        <div className="field">
          <label htmlFor="UserName" className="block">
            User Name
          </label>
          <select name="UserName" className="w-full" onChange={handleChange}>
            <option value=""> - Select - </option>
            {userNames.map((n, i) => (
              <option value={n} key={i}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={cancelClicked}>Cancel</button>
        <button onClick={randomClicked}>Sign In</button>
      </div>
    </div>
  );
}
