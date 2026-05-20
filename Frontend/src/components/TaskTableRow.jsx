import { useContext } from "react";
import { UserContext } from "./UserContext";

function TaskTableRow() {
    const userCtx = useContext(UserContext);

    const statusBadge = (task) => {
        return task.status === 'Done' ?
            <span className="badge text-bg-success">Completed</span> :
            <span className="badge text-bg-warning">Pending</span>
    };

    const taskDone = async (index) => {
        const task = userCtx.tasks[index];

        const taskId = task._id || task.id;

        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Done' })
            });

            if (response.ok) {
                const newTasks = [...userCtx.tasks];
                newTasks[index].status = 'Done';
                userCtx.setTasks(newTasks);
            }
        } catch (error) {
            console.error("Update Error:", error);
        }
    }

    const taskDelete = async (index) => {
        const task = userCtx.tasks[index];

        const taskID = task.id || task._id;

        try {
            const response = await fetch(`/api/tasks/${taskID}`, {
                method:'DELETE'
            });

            if(response.ok) {
                const newTasks = [...userCtx.tasks];
                newTasks.splice(index, 1);
                userCtx.setTasks(newTasks);
            } else {
                alert("Failed to delete task");
            }
        } catch(error) {
            console.error("Delete Error : ",error);
        }
    }

    return (
        <>
            {
                userCtx.tasks.map((task, index) => (
                    <tr className="table-dark text-center align-middle" key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{task.label}</td>
                        <td>{task.dueDate}</td>
                        <td>{task.details}</td>
                        <td>{statusBadge(task)}</td>
                        <td className="d-flex flex-row justify-content-center align-items-center gap-2">
                            {task.status !== 'Done' && <button className="btn btn-outline-success col-5" onClick={() => taskDone(index)}>Done</button>}
                            <button className="btn btn-outline-danger col-5" onClick={() => taskDelete(index)}>Delete</button>
                        </td>
                    </tr>
                ))
            }
        </>
    );
}

export default TaskTableRow;