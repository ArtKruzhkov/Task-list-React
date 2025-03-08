import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../actions/taskActions";
import { Button, Drawer, TextField } from "@mui/material";
import styles from "./add-task.module.css";

const AddTaskButton = () => {
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const toggleDrawer = (state) => () => {
        setOpen(state);
        setTask("");
        setError(false);
    };

    const handleAddTask = () => {
        if (task.includes("!")) {
            setError(true);
            return;
        }
        dispatch(addTask(task));
        toggleDrawer(false)();
    };

    return (
        <>
            <Button variant="contained" onClick={toggleDrawer(true)}>
                Добавить задачу
            </Button>

            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <div className={styles.newTaskContainer}>
                    <TextField
                        fullWidth
                        label="Новая задача"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        error={error}
                        helperText={error ? "Запрещен символ '!'" : ""}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        className={styles.addTaskBtn}
                        onClick={handleAddTask}
                        disabled={!task.trim()}
                    >
                        Добавить задачу
                    </Button>
                </div>
            </Drawer>
        </>
    );
};

export default AddTaskButton;