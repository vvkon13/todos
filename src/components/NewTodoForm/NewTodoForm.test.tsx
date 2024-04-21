import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NewTodoForm from './NewTodoForm';

const mockStore = configureStore([]);
const store = mockStore({
});

beforeEach(() => {
    store.clearActions();
});

test('allows users to add tasks', () => {
    render(
        <Provider store={store}>
            <NewTodoForm />
        </Provider>
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);

    expect(input.value).toBe('');
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'todos/addTodo',
        payload: 'New Task',
      });
});
