import { useState, useEffect } from "react";
import { UserContext } from "./components/UserContext";
import TaskTable from "./components/TaskTable";

// 1. Define the dynamic API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
    const [tasks, setTasks] = useState([]);

    /* LOAD TASKS */
    useEffect(() => {
        const loadTasks = async () => {
            try {
                // 2. Prepend the base URL to your fetch request
                const response = await fetch(`${API_BASE_URL}/api/tasks`);
                if (response.ok) {
                    const data = await response.json();
                    setTasks(data);
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            }
        };
        loadTasks();
    }, []);

    /* CREATE TASK */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            e.target.taskLabel.value === '' ||
            e.target.dueDate.value === '' ||
            e.target.taskDetails.value === '' ||
            !e.target.status.value
        ) {
            alert("Fields can't be Empty");
            return;
        }

        const newTask = {
            label: e.target.taskLabel.value,
            dueDate: e.target.dueDate.value,
            details: e.target.taskDetails.value,
            status: e.target.status.value
        };

        try {
            // 3. Prepend the base URL here as well
            const response = await fetch(`${API_BASE_URL}/api/tasks`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            });

            if (response.ok) {
                const savedTask = await response.json();
                setTasks((prevTasks) => [
                    ...prevTasks,
                    savedTask
                ]);

                /* CLEAR FORM */
                e.target.reset();
            }
        } catch (error) {
            console.error("Create Error:", error);
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="fw-bold display-2 text-primary m-3">
                TO-DO List
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-body-tertiary shadow-lg rounded-5 col-5 m-3 d-flex flex-column justify-content-center align-items-center p-4"
            >
                <div className="mb-3 col-11">
                    <label htmlFor="taskLabel" className="form-label">
                        Task Label :
                    </label>
                    <input type="text" id="taskLabel" className="form-control" />
                </div>

                <div className="mb-4 col-11">
                    <label htmlFor="dueDate" className="form-label">
                        Task Due Date :
                    </label>
                    <input type="date" id="dueDate" className="form-control" />
                </div>

                <div className="mb-4 form-floating col-11">
                    <textarea
                        id="taskDetails"
                        className="form-control"
                        placeholder="Details"
                        style={{ height: 100 }}
                    ></textarea>
                    <label htmlFor="taskDetails">Task Details</label>
                </div>

                <div className="mb-5 btn-group col-11" role="group">
                    <input
                        type="radio"
                        name="status"
                        id="status1"
                        className="btn-check"
                        value="Done"
                    />
                    <label htmlFor="status1" className="btn btn-outline-success">
                        Done
                    </label>

                    <input
                        type="radio"
                        name="status"
                        id="status2"
                        className="btn-check"
                        value="Due"
                    />
                    <label htmlFor="status2" className="btn btn-outline-danger">
                        Due
                    </label>
                </div>

                <button
                    type="submit"
                    className="btn btn-lg btn-outline-primary col-5 rounded-5"
                >
                    Submit
                </button>
            </form>

            <UserContext.Provider value={{ tasks, setTasks }}>
                <TaskTable />
            </UserContext.Provider>
        </div>
    );
}

export default App;
