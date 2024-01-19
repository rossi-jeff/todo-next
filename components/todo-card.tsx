import { useState } from 'react'
import { Todo } from '../types/todo.type'

export default function TodoCard({
	todo,
	updateTodo,
	deleteTodo,
}: {
	todo: Todo
	updateTodo: Function
	deleteTodo: Function
}) {
	const { Id, Task, Completed } = todo
	const [state, setState] = useState({ Id, Task, Completed })
	const [editing, setEditing] = useState(false)

	const edit = () => setEditing(true)

	const cancel = () => setEditing(false)

	const updateClicked = () => {
		updateTodo({ ...state })
		setEditing(false)
	}

	const deleteClicked = () => {
		const { Id } = state
		deleteTodo({ Id })
	}

	const completedChanged = (ev: any) => {
		const { checked } = ev.target
		const { Id, Task } = todo
		const Completed = checked
		setState({ ...state, Completed })
		updateTodo({ Id, Task, Completed })
	}

	const taskChanged = (ev: any) => {
		const { value } = ev.target
		setState({ ...state, Task: value })
	}
	return (
		<div className="todo-card">
			<div className="mr-2">
				<input
					type="checkbox"
					name="Completed"
					onChange={completedChanged}
					defaultChecked={state.Completed}
				/>
			</div>
			<div className="flex grow">
				{editing ? (
					<div className="w-full">
						<textarea
							name="Task"
							className="w-full"
							onChange={taskChanged}
							defaultValue={state.Task}
						></textarea>
						<div className="flex justify-between">
							<button onClick={cancel}>Cancel</button>
							<button onClick={updateClicked}>Update</button>
						</div>
					</div>
				) : (
					<div className="cursor-pointer w-full" onDoubleClick={edit}>
						{todo.Task}
					</div>
				)}
			</div>
			<div className="ml-2">
				<button onClick={deleteClicked}>Delete</button>
			</div>
		</div>
	)
}
