import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom/client";
import axios, { Axios } from "axios";
import { formatDateTime } from "./action";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import TaskList from "./TaskList";
function Gemba() {
	const [gembas, setGembas] = useState([]);
	const [taskListIdModal, setTaskListIdModal] = useState("");
	const loadGembas = () => {
		axios("http://localhost/api/gemba").then((response) => {
			const gembas = response.data.gembas;
			for (let i = 0; i < gembas?.length; i++) {
				axios
					.get(`http://localhost/api/gemba-tasks-list/${gembas[i].id}`)
					.then((response2) => {
						const taskLists = response2.data.tasks;
						gembas[i] = {
							...gembas[i],
							taskLists: taskLists,
						};
						if (i === gembas?.length - 1) {
							setGembas(gembas);
						}
					});
			}
		});
	};
	useEffect(() => {
		loadGembas();
	}, []);

	return (
		<Root>
			<header>GEMBA</header>
			<main>
				<table>
					<thead>
						<tr>
							<th>id</th>
							<th>title</th>
							<th>create date</th>
							<th>update date</th>
							<th>action</th>
						</tr>
					</thead>
					<tbody>
						{gembas.map((gemba) => (
							<tr key={gemba?.id}>
								<td>{gemba?.id}</td>
								<td>{gemba?.gembaName}</td>
								<td>{formatDateTime(gemba?.created_at)}</td>
								<td>{formatDateTime(gemba?.updated_at)}</td>
								<td>
									<EditIcon
										className="icon"
										onClick={() => setTaskListIdModal(gemba?.id)}
									></EditIcon>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</main>
			<Modal
				open={!!taskListIdModal}
				onClose={() => setTaskListIdModal("")}
				hideBackdrop={true}
			>
				<TaskList
					gemba={gembas.find((e) => e.id === taskListIdModal)}
					loadGembas={loadGembas}
					closeTaskListModal={() => setTaskListIdModal("")}
				></TaskList>
			</Modal>
		</Root>
	);
}

export default Gemba;

const Root = styled.div`
	width: 100%;
	height: 100%;
	header {
		text-align: center;
		margin: 10px auto;
		padding: 15px;
		border: 1px solid #333;
		border-radius: 4px;
	}
	main {
		height: 200px;
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
				.icon {
					font-size: 16px;
					color: blue;
				}
			}
		}
	}
`;

if (document.getElementById("root")) {
	const Index = ReactDOM.createRoot(document.getElementById("root"));

	Index.render(<Gemba />);
}
