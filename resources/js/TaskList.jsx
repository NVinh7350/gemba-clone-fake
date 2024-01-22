import React, { memo, useCallback, useState } from "react";
import styled from "styled-components";
import { Edit, ArrowBackIos } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import CheckBox from "@mui/material/Checkbox";
import { formatDateTime } from "./action";
import axios from "axios";
import TaskEditForm from "./TaskEditForm";
function TaskList(props) {
	const { loadGembas } = props;
	const { taskLists } = props?.gemba;
	const completedTask = async (taskId, isCompleted) => {
		if (isCompleted) return;
		await axios.put(`http://localhost/api/tasks/${taskId}/update-is-completed`);
		loadGembas();
	};
	const updateTask = async (taskId, data) => {
		await axios.put(`http://localhost/api/tasks/${taskId}/update-task`, data);
		loadGembas();
	};
	const [taskIdEditModal, setTaskIdEditModal] = useState("");
	console.log(taskIdEditModal);
	return (
		<TaskListRoot>
			<header>
				<ArrowBackIos onClick={props?.closeTaskListModal}></ArrowBackIos>
				<span>ArrowBack</span>
			</header>
			<main>
				<table>
					<thead>
						<tr>
							<th>id</th>
							<th>title</th>
							<th>create date</th>
							<th>update date</th>
							<th>completed</th>
							<th>action</th>
						</tr>
					</thead>
					<tbody>
						{taskLists?.map((task) => (
							<tr key={task?.id}>
								<td>{task?.id}</td>
								<td>{task?.taskName}</td>
								<td>{formatDateTime(task?.created_at)}</td>
								<td>{formatDateTime(task?.updated_at)}</td>
								<td>
									{
										<CheckBox
											className="completed-icon"
											checked={!!task?.isCompleted}
											inputProps={{ "aria-label": "controlled" }}
											onChange={() =>
												completedTask(task?.id, task?.isCompleted)
											}
										/>
									}
								</td>
								<td>
									<Edit
										className="edit-icon"
										onClick={() => {
											console.log("ok");
											setTaskIdEditModal(task?.id);
										}}
									></Edit>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</main>
			<Modal
				open={!!taskIdEditModal}
				style={{
					background: "rgba(1, 1, 1, .5)",
				}}
				hideBackdrop={true}
			>
				<Modal
					open={!!taskIdEditModal}
					onClose={() => setTaskIdEditModal("")}
					hideBackdrop={true}
					style={{
						width: "fit-content",
						height: "fit-content",
					}}
				>
					<TaskEditForm
						task={taskLists?.find((e) => e?.id === taskIdEditModal)}
						updateTask={updateTask}
						closeTaskEditForm={() => setTaskIdEditModal("")}
					></TaskEditForm>
				</Modal>
			</Modal>
		</TaskListRoot>
	);
}

const TaskListRoot = styled.div`
	width: 100%;
	height: 100vh;
	background: #f8f8f8;
	header {
		text-align: center;
		margin: 10px auto;
		padding: 15px;
		border: 1px solid #333;
		border-radius: 4px;
		display: flex;
		align-items: center;
		span {
			max-width: 95%;
			margin: 0 auto;
		}
	}
	main {
		height: 400px;
		padding: 10px;
		border: 1px solid #333;
		border-radius: 4px;
		table {
			width: 100%;
			border: 1px solid;
			border-collapse: collapse;
			text-align: center;
			th,
			td,
			tr {
				border: 1px solid;
			}
			td {
				.edit-icon,
				.completed-icon {
					font-size: 16px !important;
					color: blue;
				}
			}
		}
	}
`;
export default memo(TaskList);
