import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, editTask } from "../../actions/taskActions";
import { List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from './task-list.module.css';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const lastTaskRef = useRef(null);

    const [editOpen, setEditOpen] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskText, setEditTaskText] = useState("");
    const [error, setError] = useState(false);

    const [hoveredTaskId, setHoveredTaskId] = useState(null);
    const [hoveredDeleteButtonId, setHoveredDeleteButtonId] = useState(null);

    const [openDialog, setOpenDialog] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    useEffect(() => {
        if (lastTaskRef.current) {
            lastTaskRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [tasks]);

    const handleEditOpen = (task) => {
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
            dispatch(editTask(editTaskId, editTaskText));
            handleEditClose();
        }
    };

    const handleOpenDialog = (taskId) => {
        setTaskToDelete(taskId);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setTaskToDelete(null);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteTask(taskToDelete));
        handleCloseDialog();
    };

    return (
        <>
            <List>
                {tasks.map((task, index) => (
                    <ListItem
                        key={task.id}
                        ref={index === tasks.length - 1 ? lastTaskRef : null}
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
