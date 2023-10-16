import { useState } from "react";
import {
	selectCurrentBoard,
	selectCurrentTaskData,
} from "../features/boards/boardSelector";

import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDotsVertical, BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import BoardsNavModal from "./BoardsNavModal";
import TaskModal from "./TaskModal";
import { MODAL_TYPES, setModalType } from "../features/modal/modalSlice";
import EditTaskModal from "./EditTaskModal";
import { Menu } from "@szhsin/react-menu";
import { MenuItem } from "@szhsin/react-menu";
import { MenuDivider } from "@szhsin/react-menu";
import { MenuButton } from "@szhsin/react-menu";

const boards = ["Board1", "Board2"];

const Header = () => {
	const dispatch = useDispatch();
	const [isBoardsModalActive, setBoardsModalActive] = useState(false);
	const board = useSelector(selectCurrentBoard);

	function toggleBoardsModal() {
		setBoardsModalActive(true);
	}

	function openModal(type) {
		dispatch(setModalType(type));
	}

	return (
		<>
			<header className="header">
				<h1 className="header__title">kanban</h1>

				<p className="header__board-name" onClick={toggleBoardsModal}>
					{board && (
						<>
							{board.name}
							<i>
								<BsChevronDown />
							</i>
						</>
					)}
				</p>

				<div className="header__actions">
					<button
						disabled={Boolean(!board)}
						onClick={() => openModal(MODAL_TYPES.addTask)}
						className="header__add-board"
					>
						<AiOutlinePlus />
						<span>Add new task</span>
					</button>
					<button className="header__menu">
						<Menu
							menuButton={
								<MenuButton>
									<BsThreeDotsVertical />
								</MenuButton>
							}
							transition
							gap={30}
						>
							<MenuItem
								disabled={Boolean(!board)}
								onClick={() => openModal(MODAL_TYPES.editBoard)}
							>
								Edit Board
							</MenuItem>
							<MenuDivider />
							<MenuItem
								disabled={Boolean(!board)}
								onClick={() => openModal(MODAL_TYPES.deleteBoard)}
								className="delete"
							>
								Delete Board
							</MenuItem>
						</Menu>
					</button>
				</div>
			</header>

			{isBoardsModalActive && (
				<BoardsNavModal boards={boards} toggleFunc={setBoardsModalActive} />
			)}
		</>
	);
};

export default Header;
