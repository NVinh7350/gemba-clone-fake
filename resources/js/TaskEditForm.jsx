import React, { createRef, useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowDropDown, ArrowDropUp, Close } from "@mui/icons-material";
import BodyForm from "./BodyForm";
function TaskEditForm(props) {
	console.log("render");
	const [isOpenDetailForm, setIsOpenDetailForm] = useState(true);
	const { task, updateTask, closeTaskEditForm } = props;
	const ref = createRef();
	const handleEdit = () => {
		console.log(ref.current.getFormData());
		updateTask(task.id, ref.current.getFormData());
	};
	useEffect(() => {
		let isDragging = false;
		let offsetX, offsetY;
		const form = document.getElementById("task-edit-form");
		const formHeader = document.getElementById("task-edit-form-header");

		formHeader.addEventListener("mousedown", startDrag);
		document.addEventListener("mouseup", stopDrag);
		document.addEventListener("mousemove", drag);

		function startDrag(e) {
			isDragging = true;
			// Độ lệch trái = vị trí chuột - khoảng cách biên trái
			offsetX = e.clientX - form.getBoundingClientRect().left;
			offsetY = e.clientY - form.getBoundingClientRect().top;
		}

		function stopDrag() {
			isDragging = false;
		}

		function drag(e) {
			if (isDragging) {
				// Vị trí biên bên trái mới = vị trí chuột mới - độ lệch
				let newX = e.clientX - offsetX;
				console.log(newX);
				let newY = e.clientY - offsetY;

				// Vị trí mới phải nhỏ hơn vị trí kéo tối đa và lớn hơn vị trí tối thiểu
				newX = Math.min(
					window.innerWidth - form.offsetWidth,
					Math.max(0, newX)
				);
				newY = Math.min(
					window.innerHeight - form.offsetHeight,
					Math.max(0, newY)
				);

				form.style.left = newX + "px";
				form.style.top = newY + "px";
			}
		}
		return () => {
			formHeader.removeEventListener("mousedown", startDrag);
			document.removeEventListener("mouseup", stopDrag);
			document.removeEventListener("mousemove", drag);
		};
	}, []);
	return (
		<TaskEditFormRoot id="task-edit-form">
			<header
				id="task-edit-form-header"
				className={!isOpenDetailForm && "closeDetailForm__header"}
			>
				{isOpenDetailForm ? (
					<ArrowDropDown
						className="icon"
						onClick={() => setIsOpenDetailForm(false)}
					></ArrowDropDown>
				) : (
					<ArrowDropUp
						className="icon"
						onClick={() => setIsOpenDetailForm(true)}
					></ArrowDropUp>
				)}
				<span>Edit Task</span>
				<Close className="icon" onClick={closeTaskEditForm}></Close>
			</header>
			<main className={!isOpenDetailForm && "closeDetailForm__main"}>
				<BodyForm ref={ref} taskData={task}></BodyForm>
			</main>
			<footer className={!isOpenDetailForm && "closeDetailForm__main"}>
				<button className="btn-submit btn-15" onClick={handleEdit}>
					Submit
				</button>
			</footer>
		</TaskEditFormRoot>
	);
}

const TaskEditFormRoot = styled.div`
	margin: 10px auto;
	width: 420px;
	border-radius: 4px;
	box-shadow: 0px 0px 12px 1px #333;
	overflow: hidden;
	position: fixed;
	header {
		height: 40px;
		width: 100%;
		text-align: center;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		display: flex;
		align-items: center;
		background-color: blue;
		color: white;
		padding: 0 10px;
		cursor: move;
		span {
			max-width: 95%;
			margin: 0 auto;
		}
		.icon {
			cursor: pointer;
		}
	}
	main {
		width: 100%;
		background-color: white;
	}
	footer {
		width: 100%;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		.btn-submit {
			margin: 0 auto;
			padding: 5px 20px;
			font-size: 18px;
			font-weight: 700;
			color: white;
			background-color: blue;
			border-radius: 4px;
			box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
				7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
			outline: none;
			cursor: pointer;
			transition: all 0.3s ease;
			position: relative;
			display: inline-block;
		}
		.btn-15::after {
			position: absolute;
			content: "";
			width: 0;
			height: 100%;
			top: 0;
			right: 0;
			z-index: -1;
			background-color: #ffffff;
			border-radius: 5px;
			box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
				7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
			transition: all 0.3s ease;
		}
		.btn-15:hover {
			color: #fff;
		}
		.btn-15:hover {
			&::after {
				left: 0;
				width: 100%;
			}
		}
		.btn-15:active {
			top: 2px;
		}
	}
	.closeDetailForm {
		&__header {
			border-bottom-left-radius: 4px;
			border-bottom-right-radius: 4px;
		}
		&__main {
			display: none;
		}
	}
`;
export default TaskEditForm;
