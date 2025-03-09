// export const ADD_TASK = 'ADD_TASK';
// export const DELETE_TASK = 'DELETE_TASK';
// export const EDIT_TASK = 'EDIT_TASK';

// export const addTask = (description) => ({
//     type: ADD_TASK,
//     payload: { description }
// });

// export const deleteTask = (id) => ({
//     type: DELETE_TASK,
//     payload: { id }
// });

// export const editTask = (id, newDescription) => ({
//     type: EDIT_TASK,
//     payload: { id, newDescription }
// });



export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const EDIT_TASK = 'EDIT_TASK';

interface AddTaskAction {
    type: typeof ADD_TASK;
    payload: { description: string };
}

interface DeleteTaskAction {
    type: typeof DELETE_TASK;
    payload: { id: number };
}

interface EditTaskAction {
    type: typeof EDIT_TASK;
    payload: { id: number; newDescription: string };
}

export type TaskActionTypes = AddTaskAction | DeleteTaskAction | EditTaskAction;

export const addTask = (description: string): AddTaskAction => ({
    type: ADD_TASK,
    payload: { description },
});

export const deleteTask = (id: number): DeleteTaskAction => ({
    type: DELETE_TASK,
    payload: { id },
});

export const editTask = (id: number, newDescription: string): EditTaskAction => ({
    type: EDIT_TASK,
    payload: { id, newDescription },
});
