import { User } from "../types/user.type";

export default function UserButtons({
  currentUser,
  showEditUser,
  showChangePassWord,
}: {
  currentUser: User;
  showEditUser: Function;
  showChangePassWord: Function;
}) {
  const showEditUserClicked = () => showEditUser();
  const showChangePassWordClicked = () => showChangePassWord();
  return (
    <div className="flex justify-end mx-2 mb-2">
      <button onClick={showEditUserClicked}>Edit {currentUser.UserName}</button>
      {!currentUser.Random && (
        <button className="ml-2" onClick={showChangePassWordClicked}>
          Change PassWord
        </button>
      )}
    </div>
  );
}
