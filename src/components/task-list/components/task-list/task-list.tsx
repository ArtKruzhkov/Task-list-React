import React, { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/taskStore";
import { deleteTask, editTask } from "../../actions/taskActions";
import { List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from './task-list.module.css';

type Task = {
    id: number;
    description: string;
};

const TaskList: React.FC = () => {
    const tasks = useAppSelector((state) => state.tasks);
    const dispatch = useAppDispatch();

    const lastTaskRef = useRef<HTMLLIElement | null>(null);

    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [editTaskId, setEditTaskId] = useState<number | null>(null);
    const [editTaskText, setEditTaskText] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null);
    const [hoveredDeleteButtonId, setHoveredDeleteButtonId] = useState<number | null>(null);

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

    useEffect(() => {
        if (lastTaskRef.current) {
            lastTaskRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [tasks]);

    const handleEditOpen = (task: Task) => {
        setEditTaskId(task.id);
        setEditTaskText(task.description);
        setError(false);
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
        setEditTaskId(null);
        setEditTaskText("");
    };

    const handleEditSave = () => {
        if (editTaskText.includes("!")) {
            setError(true);
            return;
        }
        if (editTaskText.trim()) {
            if (editTaskId !== null) {
                dispatch(editTask(editTaskId, editTaskText));
            }
            handleEditClose();
        }
    };

    const handleOpenDialog = (taskId: number) => {
        setTaskToDelete(taskId);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setTaskToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (taskToDelete !== null) {
            dispatch(deleteTask(taskToDelete));
        }
        handleCloseDialog();
    };

    return (
        <>
            <List>
                {tasks.map((task, index) => (
                    <ListItem
                        key={task.id}
                        ref={index === tasks.length - 1 ? lastTaskRef : null}
                        component="li"
                        onMouseEnter={() => setHoveredTaskId(task.id)}
                        onMouseLeave={() => setHoveredTaskId(null)}
                    >
                        <div className={styles.taskItem}>
                            <ListItemText
                                primary={task.description}
                                className={styles.listItemText}
                            />
                            {hoveredTaskId === task.id && hoveredDeleteButtonId !== task.id && (
                                <IconButton
                                    edge="start"
                                    onClick={() => handleEditOpen(task)}
                                    className={styles.editButton}
                                >
                                    <EditIcon />
                                </IconButton>
                            )}
                        </div>

                        <div
                            onMouseEnter={() => setHoveredDeleteButtonId(task.id)}
                            onMouseLeave={() => setHoveredDeleteButtonId(null)}
                        >
                            <IconButton
                                edge="end"
                                onClick={() => handleOpenDialog(task.id)}
                                className={styles.deleteButton}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </ListItem>
                ))}
            </List>

            <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle>Редактировать задачу</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        value={editTaskText}
                        onChange={(e) => setEditTaskText(e.target.value)}
                        error={error}
                        helperText={error ? "Запрещен символ '!'" : ""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="secondary">Отмена</Button>
                    <Button onClick={handleEditSave} color="primary" disabled={!editTaskText.trim()}>Сохранить</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Подтверждение удаления</DialogTitle>
                <DialogContent>
                    Вы уверены, что хотите удалить эту задачу?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TaskList;