import { User } from '../types/user.type'

export default function UserButtons({ currentUser }: { currentUser: User }) {
	return (
		<div className="flex justify-end mx-2 mb-2">
			<button>Edit {currentUser.UserName}</button>
			{!currentUser.Random && <button className="ml-2">Change PassWord</button>}
		</div>
	)
}
