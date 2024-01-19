export default function WelcomeMessage() {
  return (
    <div className="m-2">
      <h2>Welcome</h2>
      <div className="mb-4">
        This site is a todo list application. Authentication is used so that
        each user will only see their own todos.
      </div>
      <div>
        For those who wish to avoid entering any personal information an option
        to log in as a randomly generated user has been provided.
      </div>
    </div>
  );
}
