import { UserContext } from "./UserContext";
import { useContext } from "react";
import TaskTableRow from "./TaskTableRow";

function TaskTable() {
    const userCtx = useContext(UserContext);
    return (
        <>
            {
                userCtx.tasks.length !== 0 &&
                <div className="overflow-hidden border border-light rounded-3 m-5 col-10">
                    <table className="table table-dark mb-0">
                        <thead>
                            <tr className="table-secondary text-center">
                                <th scope="col">Sr No.</th>
                                <th scope="col">Task Label</th>
                                <th scope="col">Due Date</th>
                                <th scope="col">Details</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TaskTableRow />
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
}

export default TaskTable;