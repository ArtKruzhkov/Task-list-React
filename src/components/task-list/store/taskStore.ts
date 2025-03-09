// import { configureStore } from "@reduxjs/toolkit";
// import taskReducer from "../reducers/taskReducer";

// const taskStore = configureStore({
//     reducer: {
//         tasks: taskReducer
//     }
// });

// export default taskStore;


import { createStore, applyMiddleware, compose } from "redux";
import taskReducer from "../reducers/taskReducer";
import { TaskActionTypes } from "../actions/taskActions";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

export type RootState = {
    tasks: { id: number; description: string }[];
};

const initialState: RootState = {
    tasks: [
        { id: 1, description: 'Task 1' },
        { id: 2, description: 'Task 2' },
        { id: 3, description: 'Task 3' },
    ],
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const taskStore = createStore(
    (state: RootState = initialState, action: TaskActionTypes): RootState => {
        return {
            tasks: taskReducer(state.tasks, action),
        };
    },
    composeEnhancers(applyMiddleware())
);

export type AppDispatch = ThunkDispatch<RootState, unknown, TaskActionTypes>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default taskStore;
