import BoardColumn from "./BoardColumn";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentBoard } from "../features/boards/boardSelector";
import { AiOutlinePlus } from "react-icons/ai";
import { MODAL_TYPES, setModalType } from "../features/modal/modalSlice";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";


const Board = () => {
	const currentBoard = useSelector(selectCurrentBoard);
	const dispactch = useDispatch();
	
	
	return (
		<section className="board-container">
			{currentBoard ? (
				<motion.div key={currentBoard.name} className="board">
					<div className="board__columns">
						<AnimatePresence>
							{currentBoard.columns.map((data) => (
								<BoardColumn
									key={data.id}
									colId={data.id}
									status={data.name}
									tasks={data.tasks}
								/>
							))}
						</AnimatePresence>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							
							className="board__add-column"
							onClick={() => {
								dispactch(setModalType(MODAL_TYPES.editBoard));
							}}
						>
							<div>
								<AiOutlinePlus />
								<h1>New Column</h1>
							</div>
						</motion.div>
					</div>
				</motion.div>
			) : (
				<div className="empty">
					<h1>No Boards Here ...</h1>
				</div>
			)}
		</section>
	);
};

export default Board;
