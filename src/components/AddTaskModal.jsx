import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "./TaskForm";
import { addTask } from "../features/boards/boardsSlice";
import { setModalType } from "../features/modal/modalSlice";

const AddTaskModal = () => {
	const dispatch = useDispatch();

	function closeModal(e) {
		if (e.target !== e.currentTarget) return;
		dispatch(setModalType(""));
	}
	return (
		<div className="modal-wrapper" onClick={closeModal}>
			<div className="modal add-task">
				<header className="add-task__header">
					<h1 className="add-task__title">Add new task</h1>
					{/* <button className="add-task__close" onClick={closeModal}>
						<RxCross2 />
					</button> */}
				</header>
				<div className="container">
					<TaskForm dispatchAction={addTask} />
				</div>
			</div>
		</div>
	);
};

export default AddTaskModal;
