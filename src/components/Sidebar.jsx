import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectBoards,
	selectCurrentBoardId,
} from "../features/boards/boardSelector";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import {
	AiOutlineEye,
	AiOutlineEyeInvisible,
	AiOutlinePlus,
} from "react-icons/ai";
import { BsMoon, BsSun } from "react-icons/bs";
import ToggleSwitch from "./ToggleSwitch";
import { changeBoard } from "../features/boards/boardsSlice";
import { useState } from "react";
import { MODAL_TYPES, setModalType } from "../features/modal/modalSlice";
import { motion } from "framer-motion";

const Sidebar = () => {
	const boards = useSelector(selectBoards);
	const currentId = useSelector(selectCurrentBoardId);
	const dispatch = useDispatch();
	const [hide, setHide] = useState(false);
	const len = boards.length;

	function showEditBoardsModal() {
		dispatch(setModalType(MODAL_TYPES.addBoard));
	}

	function selectBoard(id) {
		dispatch(changeBoard(id));
	}

	function toggleSidebar() {
		setHide(!hide);
	}

	const BoardsList = boards.map((b) => {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				onClick={() => selectBoard(b.id)}
				key={b.id}
				className={`boards-list__option ${b.id === currentId ? "active" : ""}`}
			>
				<MdOutlineSpaceDashboard />
				<span>{b.name}</span>
			</motion.div>
		);
	});
	return (
		<>
			<div className={`sidebar ${hide ? "hide" : ""}`}>
				<header className="sidebar__header"></header>
				<div className="sidebar__boards">
					<h1>All boards ({len})</h1>
					<div className="boards-list">{BoardsList}</div>
					<div className="create-new" onClick={showEditBoardsModal}>
						<MdOutlineSpaceDashboard />
						<span>
							<AiOutlinePlus />
							<button> Create New Board</button>
						</span>
					</div>
				</div>
				<div className="toggles">
					<div className="toggles__theme">
						<i className="light">
							<BsSun />
						</i>
						<ToggleSwitch />
						<i className="dark">
							<BsMoon />
						</i>
					</div>
					<button onClick={toggleSidebar} className="toggles__hide">
						<AiOutlineEyeInvisible className="iconLg" />
						<span>Hide Sidebar</span>
					</button>
				</div>
			</div>
			<button onClick={toggleSidebar} className="show-sidebar">
				<AiOutlineEye className="iconLg" />
			</button>
		</>
	);
};

export default Sidebar;
