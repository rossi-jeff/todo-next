export default function RegisterDialog({
  cancel,
  register,
}: {
  cancel: Function;
  register: Function;
}) {
  const registerClicked = () => {
    register();
  };
  return (
    <div id="register-dialog" className="dialog">
      <div>Register Dialog</div>
      <div className="flex justify-between">
        <button onClick={cancel()}>Cancel</button>
        <button onClick={registerClicked}>Register</button>
      </div>
    </div>
  );
}
