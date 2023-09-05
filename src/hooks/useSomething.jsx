import { useCallback } from "react";
import { useState } from "react";

const useSomething = () => {
	const [data, setData] = useState([]);

	const setInitialData = useCallback(
		(initData, valueField) => {
			setData(
				initData.map((d, i) => {
					return { id: d.id ? d.id : i, value: d[valueField] };
				})
			);
		},
		[data]
	);

	const addItem = useCallback(
		(e) => {
			e.preventDefault();
			setData((prevValue) => [
				...prevValue,
				{ id: crypto.randomUUID().slice(0, 4), value: "" },
			]);
		},
		[data]
	);

	const removeItem = useCallback(
		(id) => {
			setData(data.filter((d) => d.id !== id));
		},
		[data]
	);

	const onDataChange = useCallback(
		(e, id) => {
			const dataId = id;
			const val = e.target.value;
			setData(
				data.map((d) => {
					if (d.id === dataId) {
						return { ...d, value: val };
					}
					return d;
				})
			);
		},
		[data]
	);

	const resetData = useCallback(() => {
		setData([{ id: crypto.randomUUID().slice(0, 4), value: "" }]);
	}, [data]);

	return { data, addItem, removeItem, onDataChange, resetData, setInitialData };
};

export default useSomething;
