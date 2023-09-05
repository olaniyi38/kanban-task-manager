import { RxCross2 } from "react-icons/rx";
import TaskForm from "./TaskForm";
import { updateTask } from "../features/boards/boardsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectTask } from "../features/boards/boardSelector";
import { setModalType } from "../features/modal/modalSlice";
import { motion } from "framer-motion";

const EditTaskModal = () => {
	const { id, description, title, subtasks, status } = useSelector(selectTask);

	const dispatch = useDispatch();
	return (
		<div className="modal-wrapper">
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				className="modal add-task"
			>
				<header className="add-task__header">
					<h1 className="add-task__title">Edit task</h1>
					<button
						className="add-task__close"
						onClick={() => dispatch(setModalType(""))}
					>
						<RxCross2 />
					</button>
				</header>
				<div className="container">
					<TaskForm
						dispatchAction={updateTask}
						taskId={id}
						incomingValues={{
							description: description,
							title: title,
							columnName: status,
							subtasks: subtasks,
						}}
					/>
				</div>
			</motion.div>
		</div>
	);
};

export default EditTaskModal;
