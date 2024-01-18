import { useState } from "react";

export default function RegisterDialog({
  cancel,
  register,
}: {
  cancel: Function;
  register: Function;
}) {
  const [state, setState] = useState<{
    UserName: string;
    PassWord: string;
    Email: string;
  }>({
    UserName: "",
    PassWord: "",
    Email: "",
  });
  const cancelClicked = () => cancel();
  const registerClicked = () => {
    register({ ...state });
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
    <div id="register-dialog" className="dialog">
      <div className="dialog-header">
        <h3>Register</h3>
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
        <div className="field">
          <label htmlFor="Email" className="block">
            Email
          </label>
          <input
            type="email"
            name="Email"
            className="w-full"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={cancelClicked}>Cancel</button>
        <button onClick={registerClicked}>Register</button>
      </div>
    </div>
  );
}
