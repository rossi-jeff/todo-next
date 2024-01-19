import { User } from "@/types/user.type";
import { useState } from "react";

export default function EditUserDialog({
  currentUser,
  cancel,
  update,
}: {
  currentUser: User;
  cancel: Function;
  update: Function;
}) {
  const { UserName, Email } = currentUser;
  const [state, setState] = useState({ UserName, Email });

  const cancelClicked = () => cancel();

  const updateClicked = () => {
    update({ ...state });
  };

  const handleChange = (ev: any) => {
    const { name, value } = ev.target;
    const updates = {
      ...state,
      [name]: value,
    };
    setState(updates);
  };
  return (
    <div id="edit-user-dialog" className="dialog">
      <div className="dialog-header">
        <h3>Edit User</h3>
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
            defaultValue={state.UserName}
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
            defaultValue={state.Email}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={cancelClicked}>Cancel</button>
        <button onClick={updateClicked}>Update</button>
      </div>
    </div>
  );
}
