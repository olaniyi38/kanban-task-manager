import { useDispatch, useSelector } from "react-redux";
import { MODAL_TYPES, setModalType } from "../features/modal/modalSlice";
import Button from "./Button";
import { deleteBoard, deleteTask } from "../features/boards/boardsSlice";
import {
	selectCurrentBoard,
	selectTask,
} from "../features/boards/boardSelector";

const DeleteModal = ({ type }) => {
	const dispatch = useDispatch();
	const isDeleteBoard = type === MODAL_TYPES.deleteBoard;
	const title = isDeleteBoard
		? useSelector(selectCurrentBoard).name
		: useSelector(selectTask).title;

	function removeBoard() {
		dispatch(deleteBoard());
		dispatch(setModalType(""));
	}

	function removeTask() {
		dispatch(deleteTask());
		dispatch(setModalType(""));
	}

	function closeModal() {
		dispatch(setModalType(""));
	}
	return (
		<div className="modal-wrapper">
			<div className="modal modal--h-auto delete-modal">
				<h1 className="delete-modal__title">
					{isDeleteBoard ? "Delete this board?" : "Delete this task?"}
				</h1>
				<p>
					Are you sure you want to delete the '{title}'{" "}
					{isDeleteBoard ? "board" : "task"}?
					{isDeleteBoard &&
						"This action will remove all columns and  tasks and cannot be reversed."}
				</p>
				<div className="delete-modal__actions">
					{isDeleteBoard ? (
						<Button text="delete" del onClick={removeBoard} />
					) : (
						<Button text="delete" del onClick={removeTask} />
					)}
					<Button text="Cancel" inverted onClick={closeModal} />
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
