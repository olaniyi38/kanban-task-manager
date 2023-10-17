import React from "react";
import { MODAL_TYPES as MODAL_TYPES } from "../features/modal/modalSlice";
import { useSelector } from "react-redux";
import EditTaskModal from "./EditTaskModal";
import DeleteModal from "./DeleteModal";
import EditBoardsModal from "./EditBoardsModal";
import AddTaskModal from "./AddTaskModal";
import TaskModal from "./TaskModal";

const ModalsFactory = () => {
	const modalType = useSelector((state) => state.modal.type);
	switch (modalType) {
		case MODAL_TYPES.editTask:
			return <EditTaskModal />;
		case MODAL_TYPES.addTask:
			return <AddTaskModal />;
		case MODAL_TYPES.deleteBoard:
		case MODAL_TYPES.deleteTask:
			return <DeleteModal type={modalType} />;
		case MODAL_TYPES.editBoard:
		case MODAL_TYPES.addBoard:
			return <EditBoardsModal type={modalType} />;
		case MODAL_TYPES.viewTask:
			return <TaskModal />;
	}
};

export default ModalsFactory;
