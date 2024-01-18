export default function SignInDialog({
  cancel,
  signIn,
}: {
  cancel: Function;
  signIn: Function;
}) {
  const signInClicked = () => {
    signIn();
  };
  return (
    <div id="sign-in-dialog" className="dialog">
      <div>Sign in Dialog</div>
      <div className="flex justify-between">
        <button onClick={cancel()}>Cancel</button>
        <button onClick={signInClicked}>Sign In</button>
      </div>
    </div>
  );
}
