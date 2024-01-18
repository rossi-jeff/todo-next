import { SessionData } from "@/lib/session-storage";

export default function TopBar({
  session,
  showRegister,
  showSignIn,
  showRandom,
  signOut,
}: {
  session: SessionData;
  showRegister: Function;
  showSignIn: Function;
  showRandom: Function;
  signOut: Function;
}) {
  const showRegisterClicked = () => showRegister();
  const showSignInClicked = () => showSignIn();
  const showRandomClicked = () => showRandom();
  const signOutClicked = () => signOut();
  return (
    <div id="top-bar">
      <div className="flex justify-between p-2">
        <h1>ToDo App</h1>
        {session.SignedIn ? (
          <div className="flex">
            <div className="mr-2">{session.UserName}</div>
            <button onClick={signOutClicked}>Sign Out</button>
          </div>
        ) : (
          <div className="flex">
            <button onClick={showRegisterClicked}>Register</button>
            <button className="mx-2" onClick={showSignInClicked}>
              Sign In
            </button>
            <button onClick={showRandomClicked}>Random</button>
          </div>
        )}
      </div>
    </div>
  );
}
