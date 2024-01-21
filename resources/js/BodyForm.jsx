import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import styled from "styled-components";
import { datetimeLocalToIso, isoToDatetimeLocal } from "./action";

const BodyForm = forwardRef((props, ref) => {
	console.log("reder2");
	const { taskData } = props;
	const [formData, setFormData] = useState(taskData);
	useEffect(() => {
		setFormData({ ...taskData });
	}, [taskData]);
	const handleChange = (key, value) => {
		setFormData((prev) => ({
			...prev,
			[key]: value,
		}));
	};
	useImperativeHandle(ref, () => ({
		getFormData: () => ({
			...formData,
		}),
	}));

	return (
		<BodyFormRoot>
			<div className="input-field">
				<label htmlFor="task-id" className="input-label">
					ID:
				</label>
				<input
					type="text"
					name="task-id"
					id=""
					className="input-content"
					value={formData?.id}
					disabled={true}
				/>
			</div>
			<div className="input-field">
				<label htmlFor="task-id" className="input-label">
					Task name:
				</label>
				<input
					type="text"
					name="task-id"
					id=""
					className="input-content"
					value={formData?.taskName}
					onChange={(e) => handleChange("taskName", e.target.value)}
				/>
			</div>
			<div className="input-field">
				<label htmlFor="task-created-at" className="input-label">
					Create At:
				</label>
				<input
					type="datetime-local"
					name="task-created-at"
					id=""
					className="input-content"
					value={isoToDatetimeLocal(formData?.created_at)}
					onChange={(e) =>
						handleChange("created_at", datetimeLocalToIso(e.target.value))
					}
				/>
			</div>
			<div className="input-field">
				<label htmlFor="task-updated-at" className="input-label">
					Create At:
				</label>
				<input
					type="datetime-local"
					name="task-updated-at"
					id=""
					className="input-content"
					value={isoToDatetimeLocal(formData?.updated_at)}
					onChange={(e) =>
						handleChange("updated_at", datetimeLocalToIso(e.target.value))
					}
				/>
			</div>
			<div className="input-field">
				<label htmlFor="status" className="input-label">
					Status:
				</label>
				<input
					type="text"
					name="status"
					id=""
					className="input-content"
					value={formData?.isCompleted ? "completed" : "processing"}
					disabled
				/>
			</div>
		</BodyFormRoot>
	);
});

const BodyFormRoot = styled.div`
	width: 100%;
	padding: 8px;
	.input-field {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 16px;
		line-height: 16px;
		margin: 10px 0;
	}
	.input-label {
		min-width: 20%;
	}
	.input-content {
		min-width: 78%;
		border: 1px solid #333;
		border-radius: 4px;
		padding: 5px;
		&:focus {
			outline: 1px solid blue;
		}
	}
`;
export default BodyForm;
