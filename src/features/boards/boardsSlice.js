import { createSlice } from "@reduxjs/toolkit";
import boards from "../../data.json"



const boardsSlice = createSlice({
    name: "boards",
    initialState: {
        boards: boards.boards,
        currentBoardId: boards.boards[0].id,
        currentTaskData: null
    },
    reducers: {
        changeBoard: (state, action) => {
            state.currentBoardId = action.payload
        },
        addTask: (state, action) => {
            const { task, columnId } = action.payload
            const { currentBoardId } = state
            const board = state.boards.find((board) => board.id === currentBoardId)
            const column = board.columns.find((c) => c.id === columnId)
            column.tasks.push(task)
        },
        updateTask: (state, action) => {
            const { task } = action.payload
            const { currentBoardId, currentTaskData: { columnId } } = state
            const board = state.boards.find((board) => board.id == currentBoardId)
            const column = board.columns.find((c) => c.id == columnId)
            const index = column.tasks.findIndex((t) => t.id == task.id)
            if (index !== -1) {
                if (task.statusId !== columnId) {
                    column.tasks.splice(index, 1)
                    state.currentTaskData = { id: task.id, columnId: task.statusId }
                    board.columns.find((c) => c.id == task.statusId).tasks.push(task)
                    return
                }
                column.tasks[index] = task
                return
            }
            console.error("Error: Task not found")
            console.log(column)
        },
        addBoard: (state, action) => {
            state.boards.push(action.payload)
            if (state.currentBoardId === null) {
                state.currentBoardId = state.boards[0].id
            }
        },
        deleteBoard: (state, action) => {
            const newBoards = state.boards.filter((b) => b.id !== state.currentBoardId)

            return {
                ...state,
                currentBoardId: newBoards.length > 0 ? newBoards[0].id : null,
                boards: newBoards
            }
        },
        editBoard: (state, action) => {
            const boardData = action.payload
            const index = state.boards.findIndex((b) => b.id === state.currentBoardId)
            const board = state.boards.find((board) => board.id === state.currentBoardId)

            state.boards[index].name = boardData.name

            state.boards[index].columns = boardData.columns.map((c) => {
                const colIndex = board.columns.findIndex((c2) => c.id === c2.id)
                if (colIndex !== -1) {
                    return {
                        ...board.columns[colIndex],
                        name: c.name
                    }
                }
                return c
            })
        },
        deleteTask: (state, action) => {
            const { } = state.currentTaskData
            const board = state.boards.find((board) => board.id === state.currentBoardId)
            const column = board.columns.find((c) => c.id === state.currentTaskData.columnId)
            const index = column.tasks.findIndex((t) => t.id === state.currentTaskData.id)
            if (index !== -1) column.tasks.splice(index, 1)
            state.currentTaskData = null
        },
        setCurrentTaskData: (state, action) => {
            state.currentTaskData = action.payload
        },
        updateTaskOnDrop: (state, action) => {
            const { boards, currentBoardId } = state
            const { taskId, source, destination } = action.payload
            const board = state.boards.find((board) => board.id == currentBoardId)
            const sourceColumn = board.columns.find((c) => c.id == source.droppableId)
            if (!destination) return ;
            const destinationColumn = board.columns.find((c) => c.id == destination.droppableId)
            const index = sourceColumn.tasks.findIndex((t) => t.id == taskId)

            if (source.droppableId === destination.droppableId && destination.index !== index) {
                console.log("reorder")
                const [removed] = sourceColumn.tasks.splice(source.index, 1)
                sourceColumn.tasks.splice(destination.index, 0, removed)
                return
            }

            const [removed] = sourceColumn.tasks.splice(source.index, 1)
            destinationColumn.tasks.splice(destination.index, 0, { ...removed, status: destinationColumn.name, statusId: destinationColumn.id })

        }
    }

})

export const { changeBoard, addTask, deleteBoard, editBoard, deleteTask, updateTask, addBoard, setCurrentTaskData, updateTaskOnDrop } = boardsSlice.actions

export default boardsSlice.reducer