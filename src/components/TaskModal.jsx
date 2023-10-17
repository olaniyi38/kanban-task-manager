import React from "react";
import Select from "./Select";
import { useForm } from "react-hook-form";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTaskData, updateTask } from "../features/boards/boardsSlice";
import {
	selectCurrentBoard,
	selectTask,
} from "../features/boards/boardSelector";
import CheckBox from "./CheckBox";

import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

import { MODAL_TYPES, setModalType } from "../features/modal/modalSlice";
import { useRef } from "react";

const TaskModal = () => {
	const dispatch = useDispatch();
	const task = useSelector(selectTask);
	const board = useSelector(selectCurrentBoard);
	const boardColumns = board.columns.map((c) => {
		return { name: c.name, id: c.id };
	});

	const statuses = useSelector(selectCurrentBoard).columns.map((c) => c.name);
	const modalRef = useRef();

	const { title, description, subtasks, status } = task;

	function updateSubtasks(e, title) {
		const index = subtasks.findIndex((s) => s.title === title);
		const newSubtasks = subtasks.map((s, i) => {
			if (i === index) {
				return { ...s, isCompleted: e.target.checked };
			}
			return s;
		});
		dispatch(updateTask({ task: { ...task, subtasks: newSubtasks } }));
	}

	function changeColumn(e) {
		const columnName = e.target.value;
		const columnId = boardColumns.find(
			(c) => c.name.toLowerCase() === columnName.toLowerCase()
		).id;
		dispatch(
			updateTask({
				task: { ...task, status: columnName, statusId: columnId },
			})
		);
	}

	function closeModal(e) {
		if (e.target !== e.currentTarget) return;
		dispatch(setModalType(""));
		dispatch(setCurrentTaskData(null));
	}

	function openDeleteTaskModal() {
		dispatch(setModalType(MODAL_TYPES.deleteTask));
	}

	const subTasksDoneLen = subtasks.filter((s) => s.isCompleted === true).length;

	return (
		<div className="modal-wrapper" onClick={closeModal}>
			<>
				<div ref={modalRef} className="modal modal--h-auto task-modal">
					<header className="task-modal__header">
						<h1 className="task-modal__title">{title}</h1>
						<button className="task-modal__menu">
							<Menu
								className="menu"
								menuButton={
									<MenuButton>
										<BsThreeDotsVertical className="iconLg" />
									</MenuButton>
								}
								transition
								gap={12}
								align="center"
								boundingBoxRef={modalRef}
							>
								<MenuItem
									onClick={() => dispatch(setModalType(MODAL_TYPES.editTask))}
								>
									Edit task
								</MenuItem>
								<MenuItem onClick={openDeleteTaskModal} className="delete">
									Delete task
								</MenuItem>
							</Menu>
						</button>
					</header>
					<p className="task-modal__description">{description}</p>

					<div className="task-modal__subtasks">
						<h1>
							Subtasks ({subTasksDoneLen} of {subtasks.length})
						</h1>
						<div>
							{subtasks.map(({ title, isCompleted }, i) => (
								<CheckBox
									key={title}
									type="checkbox"
									label={title}
									name={title}
									onChange={(e) => updateSubtasks(e, title)}
									checked={isCompleted}
								/>
							))}
						</div>
					</div>

					<div className="task-modal__status">
						<Select
							label="current column"
							name="columnName"
							options={[...statuses]}
							onChangeHandler={changeColumn}
							defaultOption={status}
						/>
					</div>
				</div>
			</>
		</div>
	);
};

export default TaskModal;
