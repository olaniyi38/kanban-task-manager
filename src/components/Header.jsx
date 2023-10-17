import { useState } from "react";
import { selectCurrentBoard } from "../features/boards/boardSelector";

import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDotsVertical, BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import BoardsNavModal from "./BoardsNavModal";
import { MODAL_TYPES, setModalType } from "../features/modal/modalSlice";
import { Menu, MenuItem, MenuDivider, MenuButton } from "@szhsin/react-menu";

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

				<p className="header__board-name">
					{board && (
						<>
							{board.name}
							<button className="toggle-nav" onClick={toggleBoardsModal}>
								<BsChevronDown />
							</button>
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
				<BoardsNavModal toggleFunc={setBoardsModalActive} />
			)}
		</>
	);
};

export default Header;
