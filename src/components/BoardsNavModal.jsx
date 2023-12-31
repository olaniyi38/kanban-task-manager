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
import useToggleTheme from "../hooks/useToggleTheme";
import { selectTheme } from "../features/theme/themeSlice";

const BoardsNavModal = ({ toggleFunc }) => {
	const boards = useSelector(selectBoards);
	const currentBoardId = useSelector(selectCurrentBoardId);
	const { theme } = useSelector(selectTheme);
	const dispatch = useDispatch();
	const len = boards.length;
	const toggleTheme = useToggleTheme();

	function closeModal(e) {
		if (e.target !== e.currentTarget) return;
		toggleFunc(false);
	}

	const BoardsList = boards.map((b, i) => {
		return (
			<div
				key={b.id}
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
		<div className="modal-wrapper" onClick={closeModal}>
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
					<i className="dark">
						<BsMoon />
					</i>
					<ToggleSwitch onClick={toggleTheme} isActive={theme === "light"} />
					<i className="light">
						<BsSun />
					</i>
				</div>
			</div>
		</div>
	);
};

export default BoardsNavModal;
