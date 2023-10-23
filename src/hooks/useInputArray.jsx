import { useCallback } from "react";
import { useState } from "react";

//manages an array of data from multiple input elements
const useInputArray = () => {
	const [data, setData] = useState([]);

	//maps a initial data from given data, takes a valueField to serve as the key for the initial data values
	//e.g init Data = [{name:"john"},{name:"doe"}]...valueField is "name"
	const setInitialData = useCallback(
		(initData, valueField) => {
			setData(
				initData.map((d) => {
					return {
						id: d.id ? d.id : crypto.randomUUID().slice(0, 6),
						value: d[valueField],
					};
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
				{ id: crypto.randomUUID().slice(0, 6), value: "" },
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

export default useInputArray;
