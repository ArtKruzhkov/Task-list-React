import { useState } from "react";
import { useAppDispatch } from "../../store/taskStore";
import { addTask } from "../../actions/taskActions";
import { Button, Drawer, TextField } from "@mui/material";
import styles from "./add-task.module.css";

interface AddTaskButtonState {
    open: boolean;
    task: string;
    error: boolean;
}

const AddTaskButton: React.FC = () => {
    const [state, setState] = useState<AddTaskButtonState>({
        open: false,
        task: "",
        error: false,
    });

    const dispatch = useAppDispatch();

    const toggleDrawer = (state: boolean) => () => {
        setState(prevState => ({
            ...prevState,
            open: state,
            task: "",
            error: false,
        }));
    };

    const handleAddTask = (): void => {
        if (state.task.includes("!")) {
            setState(prevState => ({
                ...prevState,
                error: true,
            }));
            return;
        }
        dispatch(addTask(state.task));
        toggleDrawer(false)();
    };

    return (
        <>
            <Button variant="contained" onClick={toggleDrawer(true)}>
                Добавить задачу
            </Button>

            <Drawer anchor="right" open={state.open} onClose={toggleDrawer(false)}>
                <div className={styles.newTaskContainer}>
                    <TextField
                        fullWidth
                        label="Новая задача"
                        value={state.task}
                        onChange={(e) => setState(prevState => ({
                            ...prevState,
                            task: e.target.value
                        }))}
                        error={state.error}
                        helperText={state.error ? "Запрещен символ '!'" : ""}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        className={styles.addTaskBtn}
                        onClick={handleAddTask}
                        disabled={!state.task.trim()}
                    >
                        Добавить задачу
                    </Button>
                </div>
            </Drawer>
        </>
    );
};

export default AddTaskButton;
