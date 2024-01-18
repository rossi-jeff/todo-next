import { Todo } from '../types/todo.type'

export default function TodoCard({ todo }: { todo: Todo }) {
	return (
		<div className="flex justify-between mx-2 mb-2">
			<div className="mr-2">
				<input type="checkbox" name="Completed" />
			</div>
			<div className="flex grow">{todo.Task}</div>
			<div className="ml-2">
				<button>Delete</button>
			</div>
		</div>
	)
}
