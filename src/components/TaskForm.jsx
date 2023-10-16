import { useEffect } from "react";

import { useForm } from "react-hook-form";
import useInputArray from "../hooks/useInputArray";

import FormInput from "./FormInput";
import Select from "./Select";
import Button from "./Button";

import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentBoard } from "../features/boards/boardSelector";
import { setModalType } from "../features/modal/modalSlice";
import { AnimatePresence, motion } from "framer-motion";

const TaskForm = ({ dispatchAction, taskId = null, incomingValues = null }) => {
	const dispatch = useDispatch();
	const { data, resetData, removeItem, addItem, onDataChange, setInitialData } =
		useInputArray();
	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: {
			description: incomingValues ? incomingValues.description : "",
			title: incomingValues ? incomingValues.title : "",
		},
	});

	const board = useSelector(selectCurrentBoard);
	const boardColumns = board.columns.map((c) => {
		return { name: c.name, id: c.id };
	});

	const errors = formState.errors;

	const subtasks = data.map(({ id, value }) => {
		return { title: value, isCompleted: false, id: id };
	});

	useEffect(() => {
		if (incomingValues) {
			incomingValues && setInitialData(incomingValues.subtasks, "title");
			return;
		}
		setInitialData([{ id: 0, value: "" }], "value");
	}, []);

	function resetValues() {
		reset({
			description: "",
			title: "",
			columnName: "",
		});
		resetData();
	}

	const onSubmit = ({ title, description, columnName }) => {
		const columnId = boardColumns.find(
			(c) => c.name.toLowerCase() === columnName.toLowerCase()
		).id;
		const task = {
			id: taskId === null ? crypto.randomUUID().slice(0, 4) : taskId,
			title,
			description,
			status: columnName,
			statusId: columnId,
			subtasks: [...subtasks],
		};
		dispatch(dispatchAction({ task: task, columnId }));
		dispatch(setModalType(""));
		resetValues();
	};

	return (
		<>
			<form className="form" onSubmit={(e) => e.preventDefault()}>
				<FormInput
					label="title"
					name="title"
					error={errors}
					register={register}
				/>
				<div className="subtasks">
					<label className="form-group__label">Subtasks</label>

					<AnimatePresence>
						{data.map((s, i) => (
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3 }}
								layout
								key={s.id}
							>
								<FormInput
									name={`subtask${i}`}
									error={errors}
									register={register}
									value={s.value}
									onChange={(e) => onDataChange(e, s.id)}
								/>
								<button onClick={() => removeItem(s.id)}>
									<RxCross2 className="iconLg icn-cross" />
								</button>
							</motion.div>
						))}
					</AnimatePresence>

					<Button
						onClick={addItem}
						text="Add subtask"
						svgEl={<AiOutlinePlus />}
					/>
				</div>

				<div className="form-group">
					<label className="form-group__label">Description</label>
					<textarea rows={5} {...register("description")} />
				</div>
				<Select
					options={boardColumns.map((c) => c.name)}
					label="column name"
					name="columnName"
					register={register}
					error={errors}
					defaultOption={incomingValues && incomingValues.columnName}
				/>
				<Button text="Submit" onClick={handleSubmit(onSubmit)} />
			</form>
		</>
	);
};

export default TaskForm;
