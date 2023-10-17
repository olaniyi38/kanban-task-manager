import { DragDropContext } from "react-beautiful-dnd";
import Board from "./components/Board";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentBoard } from "./features/boards/boardSelector";
import { updateTaskOnDrop } from "./features/boards/boardsSlice";
import ScrollContainer from "react-indiana-drag-scroll";
import ModalsFactory from "./components/ModalsFactory";

function App() {
	const dispatch = useDispatch();
	const onDragEnd = useCallback((result) => {
		const { source, destination, draggableId: taskId } = result;

		dispatch(updateTaskOnDrop({ taskId, source, destination }));
	});

	return (
		<>
			<Header />
			<main>
				<Sidebar />
				<DragDropContext onDragEnd={onDragEnd}>
					<ScrollContainer
						mouseScroll={{ ignoreElements: ".task", overscroll: true }}
						hideScrollbars={false}
						className="scroll-container"
					>
						<Board id={0} />
					</ScrollContainer>
				</DragDropContext>

				<ModalsFactory />
			</main>
		</>
	);
}

export default App;
