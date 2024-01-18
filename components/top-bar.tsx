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
  return (
    <div id="top-bar">
      <div className="flex justify-between p-2">
        <h1>ToDo App</h1>
        {session.SignedIn ? (
          <div className="flex">
            <div className="mr-2">{session.UserName}</div>
            <button onClick={signOut()}>Sign Out</button>
          </div>
        ) : (
          <div className="flex">
            <button onClick={showRegister()}>Register</button>
            <button className="mx-2" onClick={showSignIn()}>
              Sign In
            </button>
            <button onClick={showRandom()}>Random</button>
          </div>
        )}
      </div>
    </div>
  );
}
