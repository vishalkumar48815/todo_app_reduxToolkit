import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    taskList: [],
    error: null,
    loading: false,
    filterKeyword: "",
    searchKeyword: ""
}

const taskSlice = createSlice({
    name: "Task",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.taskList.push(action.payload);
        },
        removeTask: (state, action) => {
            // debugger
            // console.log(action.payload)
            state.taskList = state.taskList.filter(task => task.id !== action.payload.id)
        },
        editExistingTask: (state, action) => {
            const task = state.taskList.find(task => task.id === action.payload.id);
            task.task = action.payload.task
        },
        toggleMarkComplete: (state, action) => {
            const task = state.taskList.find(task => task.id === action.payload.id);
            task.complete = !task.complete
        }
    }
})

export const { addTask, removeTask, toggleMarkComplete, editExistingTask } = taskSlice.actions

export default taskSlice.reducer