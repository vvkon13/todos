import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Action } from 'redux';
import TodoItem from './TodoItem';
import { toggleComplete } from '../../store/todoSlice';


const middlewares: never[] = [];
const mockStore = configureStore<{}, Action>(middlewares);

describe('TodoItem', () => {
  let store:any;
  const todoItemProps = {
    id: '1',
    title: 'Test Todo Item',
    completed: false,
  };

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  test('displays the todo item', () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <TodoItem {...todoItemProps} />
      </Provider>
    );

    expect(getByText(todoItemProps.title)).toBeInTheDocument();
    expect(getByRole('checkbox')).not.toBeChecked();
  });

  test('toggles todo item completion status', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <TodoItem {...todoItemProps} />
      </Provider>
    );

    fireEvent.click(getByRole('checkbox'));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(toggleComplete(todoItemProps.id));
  });
});

