import { useState } from "react";

export default function NewTodoDialog({
  cancel,
  addToDo,
}: {
  cancel: Function;
  addToDo: Function;
}) {
  const [state, setState] = useState({ Task: "", Completed: false });

  const completedChanged = (ev: any) => {
    const { checked } = ev.target;
    setState({ ...state, Completed: checked });
  };

  const taskChanged = (ev: any) => {
    const { value } = ev.target;
    setState({ ...state, Task: value });
  };

  const cancelClicked = () => cancel();

  const addToDoClicked = () => {
    addToDo({ ...state });
  };

  return (
    <div id="new-todo-dialog" className="dialog">
      <div className="dialog-header">
        <h3>Add a ToDo</h3>
      </div>
      <div className="dialog-content">
        <div className="field">
          <label htmlFor="Task" className="block">
            Task
          </label>
          <textarea
            name="Task"
            className="w-full"
            defaultValue={state.Task}
            onChange={taskChanged}
          ></textarea>
        </div>
        <div className="field">
          <div className="flex">
            <div className="mr-2">
              <input
                type="checkbox"
                name="Completed"
                defaultChecked={state.Completed}
                onChange={completedChanged}
              />
            </div>
            <label htmlFor="Completed">Completed</label>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={cancelClicked}>Cancel</button>
        <button onClick={addToDoClicked}>Add ToDo</button>
      </div>
    </div>
  );
}
