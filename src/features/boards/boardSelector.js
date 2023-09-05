export const selectBoards = (state) => state.boards.boards

export const selectCurrentBoard = (state) => {
    if (state.boards.currentBoardId !== null) {
        const id = state.boards.currentBoardId
        return state.boards.boards.find((b) => b.id === id)
    }

    return null
}



export const selectCurrentBoardId = state => state.boards.currentBoardId

export const selectCurrentTaskData = state => state.boards.currentTaskData

export const selectTask = (state) => {
    const { boards, currentBoardId, currentTaskData } = state.boards
    const board = boards.find((b) => b.id === currentBoardId)
    const column = board.columns.find((c) => c.id === currentTaskData.columnId)
    const taskData = column.tasks.find((t) => t.id === currentTaskData.id)
    return taskData

}
