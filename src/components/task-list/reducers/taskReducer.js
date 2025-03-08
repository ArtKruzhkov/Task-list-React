import { ADD_TASK, DELETE_TASK, EDIT_TASK } from "../actions/taskActions";

const initialState = [
    {
        id: 1,
        description: 'Task 1'
    },
    {
        id: 2,
        description: 'Task 2'
    },
    {
        id: 3,
        description: 'Task 3'
    }
];

function taskReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK:
            return [...state, {
                id: Date.now(),
                description: action.payload.description,
                completed: false
            }];
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