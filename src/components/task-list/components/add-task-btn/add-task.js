
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../actions/taskActions";
import { Button, Drawer, Toolbar, TextField } from "@mui/material";

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
        dispatch(addTask(task)); // Добавляем в Redux
        toggleDrawer(false)();
    };

    return (
        <>
            <Button variant="contained" onClick={toggleDrawer(true)}>
                Добавить задачу
            </Button>

            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Toolbar />
                <div style={{ padding: 16, width: 300 }}>
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
                        onClick={handleAddTask}
                        disabled={!task.trim()}
                        style={{ marginTop: 16 }}
                    >
                        Добавить задачу
                    </Button>
                </div>
            </Drawer>
        </>
    );
};

export default AddTaskButton;