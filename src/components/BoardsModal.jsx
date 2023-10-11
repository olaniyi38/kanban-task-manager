import { AiOutlinePlus } from "react-icons/ai";
import { BsMoon, BsSun } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import ToggleSwitch from "./ToggleSwitch";
import { useDispatch, useSelector } from "react-redux";
import {
	selectBoards,
	selectCurrentBoardId,
} from "../features/boards/boardSelector";
import { changeBoard } from "../features/boards/boardsSlice";
import { MODAL_TYPES, setModalType } from "../features/modal/modalSlice";

const BoardsModal = ({ toggleFunc }) => {
	const boards = useSelector(selectBoards);
	const currentBoardId = useSelector(selectCurrentBoardId);
	const dispatch = useDispatch();
	const len = boards.length;

	const BoardsList = boards.map((b, i) => {
		return (
			<div key={b.id}
				onClick={() => dispatch(changeBoard(b.id))}
				className={`board-select__option ${
					b.id === currentBoardId ? "active" : ""
				}`}
			>
				<MdOutlineSpaceDashboard />
				<span>{b.name}</span>
			</div>
		);
	});

	return (
		<div className="modal-wrapper" onClick={() => toggleFunc(false)}>
			<div className="boards-modal modal">
				<div className="board-select">
					<h1>All boards ({len})</h1>
					<div className="board-select__options">{BoardsList}</div>
				</div>
				<div
					className="create-new"
					onClick={() => dispatch(setModalType(MODAL_TYPES.addBoard))}
				>
					<AiOutlinePlus />
					<button>Create New Board</button>
				</div>
				<div className="toggle-theme">
					<i className="light">
						<BsSun />
					</i>
					<ToggleSwitch />
					<i className="dark">
						<BsMoon />
					</i>
				</div>
			</div>
		</div>
	);
};

export default BoardsModal;
