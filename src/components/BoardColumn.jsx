import React from "react";
import Task from "./Task";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Droppable } from "react-beautiful-dnd";

const BoardColumn = ({ tasks, status, colId }) => {
	const len = tasks.length;
	const isEmpty = len === 0;
	return (
		<Droppable
			key={colId}
			droppableId={colId.toString()}
			
		>
			{(provided, snapshot) => (
				<motion.div
					ref={provided.innerRef}
					{...provided.droppableProps}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0 }}
					className={`board-column ${isEmpty ? "empty" : false}`}
				>
					<h1 className={`board-column__title `}>
						<span className={`tag-color ${status.toLowerCase()}`}></span>
						<p>
							{status} ({len})
						</p>
					</h1>
					<div className="board-column__tasks">
						<AnimatePresence mode="wait">
						{tasks.map((data, i) => (
							<Task key={data.id} columnId={colId} data={data} index={i} />
						))}
						</AnimatePresence>
					</div>
				</motion.div>
			)}
		</Droppable>
	);
};

export default BoardColumn;
