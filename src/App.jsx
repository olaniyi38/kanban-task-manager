import { DragDropContext } from "react-beautiful-dnd";
import Board from "./components/Board";
import Header from "./components/Header";
import Modals from "./components/Modals";
import Sidebar from "./components/Sidebar";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentBoard } from "./features/boards/boardSelector";
import {
	setCurrentTaskData,
	updateTask,
	updateTaskOnDrop,
} from "./features/boards/boardsSlice";

function App() {
	const board = useSelector(selectCurrentBoard);
	const dispatch = useDispatch();
	const onDragEnd = useCallback((result) => {
		const { source, destination, draggableId: taskId } = result;
	
		dispatch(updateTaskOnDrop({ taskId, source, destination }));
		
	});
	return (
		<>
			<Header />
			<main>
				<div className="scroll-container">
					<Sidebar />
					<DragDropContext onDragEnd={onDragEnd}>
						<Board id={0} />
					</DragDropContext>
				</div>
				<Modals />
			</main>
		</>
	);
}

export default App;
