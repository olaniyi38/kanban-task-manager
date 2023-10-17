import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import TaskForm from "./TaskForm";
import { addTask } from "../features/boards/boardsSlice";
import { setModalType } from "../features/modal/modalSlice";

const AddTaskModal = () => {
	const dispatch = useDispatch();

	return (
		<div className="modal-wrapper">
			<div className="modal add-task">
				<header className="add-task__header">
					<h1 className="add-task__title">Add new task</h1>
					<button
						className="add-task__close"
						onClick={() => dispatch(setModalType(""))}
					>
						<RxCross2 />
					</button>
				</header>
				<div className="container">
					<TaskForm dispatchAction={addTask} />
				</div>
			</div>
		</div>
	);
};

export default AddTaskModal;
