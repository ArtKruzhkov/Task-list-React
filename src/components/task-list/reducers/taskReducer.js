// import { ADD_TASK, DELETE_TASK, TOGGLE_TASK, EDIT_TASK } from "../actions/taskActions";
import { ADD_TASK, DELETE_TASK, EDIT_TASK } from "../actions/taskActions";
const initialState = [
    {
        id: 1,
        description: 'Learn React Basics'
    },
    {
        id: 2,
        description: 'Learn Hooks'
    },
    {
        id: 3,
        description: 'Learn Router'
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
        // case TOGGLE_TASK:
        //     return state.map(task => task.id === action.payload.id ? { ...task, completed: !task.completed } : task);
        case EDIT_TASK:
            return state.map(task =>
                task.id === action.payload.id ? { ...task, description: action.payload.newDescription } : task
            );
        default:
            return state;
    }
}

export default taskReducer;