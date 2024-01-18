export default function RandomDialog({
  userNames,
  cancel,
  randomSignIn,
}: {
  userNames: string[];
  cancel: Function;
  randomSignIn: Function;
}) {
  const randomClicked = () => {
    randomSignIn();
  };
  return (
    <div id="random-dialog" className="dialog">
      <div>Random Dialog</div>
      <select name="UserName">
        <option value=""> - Select - </option>
        {userNames.map((n, i) => (
          <option value={n} key={i}>
            {n}
          </option>
        ))}
      </select>
      <div className="flex justify-between">
        <button onClick={cancel()}>Cancel</button>
        <button onClick={randomClicked}>Sign In</button>
      </div>
    </div>
  );
}
