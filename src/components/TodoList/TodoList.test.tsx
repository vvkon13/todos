import { render } from '@testing-library/react'
import { Provider } from 'react-redux';
import store from '../../store';
import TodoList from './TodoList';
import { addTodo } from '../../store/todoSlice';

// добавление тестовых задач в стор
store.dispatch(addTodo('Test Task'));

test('displays tasks from the store', () => {
    const { getByText } = render(
        <Provider store={store}>
            <TodoList />
        </Provider>
    );
    expect(getByText('Test Task')).toBeInTheDocument();
});


