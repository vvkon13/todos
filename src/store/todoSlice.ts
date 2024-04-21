import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Todo = {
    id: string,
    title: string,
    completed: boolean,
}

type TodosState = {
    list: Todo[],
    itemsLeft: number,
}

const initialState: TodosState = {
    list: [],
    itemsLeft: 0,
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.list.push({
                id: new Date().toISOString(),
                title: action.payload,
                completed: false,
            });
            state.itemsLeft = state.itemsLeft + 1;
        },
        toggleComplete(state, action: PayloadAction<string>) {
            const toggledTodo = state.list.find(todo => todo.id === action.payload);
            if (toggledTodo) {
                if (toggledTodo.completed) state.itemsLeft = state.itemsLeft + 1
                else  state.itemsLeft = state.itemsLeft - 1
                toggledTodo.completed = !toggledTodo.completed;
            }
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.list = state.list.filter(todo => todo.id !== action.payload);
            state.itemsLeft = state.itemsLeft - 1;
        },
        cancelComplete(state) {
            state.list = state.list.map(todo => {
                todo.completed = false;
                return todo
            })
            state.itemsLeft = state.list.length;
        },
        allComplete(state) {
            state.list = state.list.map(todo => {
                todo.completed = true;
                return todo
            })
            state.itemsLeft = 0;
        }
    },
});

export const { addTodo, toggleComplete, removeTodo, cancelComplete, allComplete} = todoSlice.actions;

export default todoSlice.reducer;