import { useState } from "react";

export default function ChangePassWordDialog({
  cancel,
  changePassWord,
}: {
  cancel: Function;
  changePassWord: Function;
}) {
  const [state, setState] = useState({
    OldPassWord: "",
    NewPassWord: "",
    Confirmation: "",
  });

  const handleChange = (ev: any) => {
    const { name, value } = ev.target;
    const updates = {
      ...state,
      [name]: value,
    };
    setState(updates);
  };

  const cancelClicked = () => cancel();

  const changeClicked = () => {
    const { OldPassWord, NewPassWord, Confirmation } = state;
    if (!OldPassWord || !NewPassWord || NewPassWord != Confirmation) return;
    changePassWord({ OldPassWord, NewPassWord, Confirmation });
  };
  return (
    <div id="change-pass-word-dialog" className="dialog">
      <div className="dialog-header">
        <h3>Change PassWord</h3>
      </div>
      <div className="dialog-content">
        <div className="field">
          <label htmlFor="OldPassWord" className="block">
            Old PassWord
          </label>
          <input
            type="password"
            name="OldPassWord"
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="NewPassWord" className="block">
            New PassWord
          </label>
          <input
            type="password"
            name="NewPassWord"
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="Confirmation" className="block">
            Confirmation
          </label>
          <input
            type="password"
            name="Confirmation"
            onChange={handleChange}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={cancelClicked}>Cancel</button>
        <button onClick={changeClicked}>Change PassWord</button>
      </div>
    </div>
  );
}
