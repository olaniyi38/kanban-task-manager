import { set, useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import FormInput from "./FormInput";
import Button from "./Button";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addBoard, editBoard } from "../features/boards/boardsSlice";
import { useEffect } from "react";
import { MODAL_TYPES, setModalType } from "../features/modal/modalSlice";
import useSomething from "../hooks/useSomething";
import { selectCurrentBoard } from "../features/boards/boardSelector";

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const EditBoardsModal = ({ type }) => {
	const dispatch = useDispatch();
	const currentBoard = useSelector(selectCurrentBoard);
	const { register, formState, reset, handleSubmit, setValue } = useForm();
	const errors = formState.errors;

	const { data, addItem, removeItem, onDataChange, resetData, setInitialData } =
		useSomething();

	const title =
		type === MODAL_TYPES.addBoard ? "create new board" : "edit board";

	const columns = data.map(({ id, value }) => {
		return {
			id: id,
			name: value,
			tasks: [],
		};
	});

	function close(e) {
		if (e.target !== e.currentTarget) return;
		dispatch(setModalType(""));
	}

	useEffect(() => {
		if (type === MODAL_TYPES.editBoard) {
			setValue("name", currentBoard.name);
			setInitialData(currentBoard.columns, "name");
			return;
		}
		setInitialData([{ id: 0, value: "" }], "value");
	}, []);

	function createBoard({ name }) {
		const newBoard = {
			id: crypto.randomUUID().slice(0, 5),
			name,
			columns: [...columns],
		};
		dispatch(addBoard(newBoard));
		dispatch(setModalType(""));
		reset({ name: "" });
	}

	function modifyBoard({ name }) {
		const newBoard = {
			name,
			columns: [...columns],
		};
		dispatch(editBoard(newBoard));
		dispatch(setModalType(""));
		reset({ name: "" });
	}

	return (
		<div className="modal-wrapper" onClick={close}>
			<div className="edit-boards modal modal--h-auto">
				<header className="edit-boards__header">
					<h1>{title}</h1>
					<RxCross2 className="iconLg" onClick={close} />
				</header>

				<FormInput
					label="Name"
					name="name"
					register={register}
					errors={errors}
				/>
				<div className="edit-boards__columns">
					<label className="form-group__label">Columns</label>
					<AnimatePresence>
						{data.map(({ id, value }) => (
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								layout
								key={id}
							>
								<FormInput
									name={`column${id}`}
									register={register}
									errors={errors}
									value={value}
									onChange={(e) => {
										onDataChange(e, id);
									}}
								/>
								<button onClick={() => removeItem(id)}>
									<RxCross2 className="iconLg" />
								</button>
							</motion.div>
						))}
					</AnimatePresence>

					<Button
						inverted
						text={"add new column"}
						onClick={addItem}
						svgEl={<AiOutlinePlus />}
					/>
				</div>

				{type === MODAL_TYPES.addBoard && (
					<Button
						onClick={handleSubmit(createBoard)}
						type="submit"
						text={"Create Board"}
					/>
				)}
				{type === MODAL_TYPES.editBoard && (
					<Button
						onClick={handleSubmit(modifyBoard)}
						type="submit"
						text={"Save Changes"}
					/>
				)}
			</div>
		</div>
	);
};

export default EditBoardsModal;
