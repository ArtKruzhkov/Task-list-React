import { ADD_TASK, DELETE_TASK, EDIT_TASK, TaskActionTypes } from "../actions/taskActions";

export interface Task {
    id: number;
    description: string;
}

type TaskState = Task[];

const initialState: TaskState = [
    { id: 1, description: 'Task 1' },
    { id: 2, description: 'Task 2' },
    { id: 3, description: 'Task 3' },
];

function taskReducer(state: TaskState = initialState, action: TaskActionTypes): TaskState {
    switch (action.type) {
        case ADD_TASK:
            return [...state, { id: Date.now(), description: action.payload.description }];
        case DELETE_TASK:
            return state.filter(task => task.id !== action.payload.id);
        case EDIT_TASK:
            return state.map(task =>
                task.id === action.payload.id ? { ...task, description: action.payload.newDescription } : task
            );
        default:
            return state;
    }
}

export default taskReducer;
