import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentTaskData } from "../features/boards/boardsSlice";
import { motion } from "framer-motion";
import { Draggable } from "react-beautiful-dnd";
import { MODAL_TYPES, setModalType } from "../features/modal/modalSlice";

const Task = ({ data, columnId, index }) => {
	const dispatch = useDispatch();
	const { title, subtasks, id } = data;
	const completed = subtasks.filter((t) => t.isCompleted === true).length;

	function viewTask() {
		dispatch(setModalType(MODAL_TYPES.viewTask));
		dispatch(setCurrentTaskData({ id, columnId }));
	}

	return (
		<Draggable key={id} draggableId={id.toString()} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={{ ...provided.draggableProps.style }}
					className="task"
					onClick={viewTask}
				>
					<div className="task__title">{title}</div>
					<div className="task__info">
						{completed} of {subtasks.length}
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Task;
