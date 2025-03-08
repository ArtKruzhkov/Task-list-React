export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const EDIT_TASK = 'EDIT_TASK';

export const addTask = (description) => ({
    type: ADD_TASK,
    payload: { description }
});

export const deleteTask = (id) => ({
    type: DELETE_TASK,
    payload: { id }
});

export const editTask = (id, newDescription) => ({
    type: EDIT_TASK,
    payload: { id, newDescription }
});