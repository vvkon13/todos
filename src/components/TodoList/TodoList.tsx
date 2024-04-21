import { useState, HTMLAttributes } from 'react';
import { clsx } from 'clsx';

import { useAppSelector } from '../../hooks';
import { useAppDispatch } from '../../hooks';
import { cancelComplete } from '../../store/todoSlice';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css'

enum Status {
    All = 'All',
    Active = 'Active',
    Completed = 'Completed'
}

const TodoList: React.FC<HTMLAttributes<HTMLElement>> = ({ className }) => {
    const [statusFilterTodos, setStatusFilterTodos] = useState<Status>(Status.All)
    const dispatch = useAppDispatch();
    const todos = useAppSelector(state => state.todos.list);
    const taskСounter = useAppSelector(state => state.todos.itemsLeft);

    return (
        <>
            {(todos && (todos.length > 0)) && (<section className={clsx(className, 'todos')}>
                <ul className='todos__list'>
                    {todos.map((todo) =>
                        ((statusFilterTodos === Status.All) || (statusFilterTodos === Status.Active && !todo.completed) || (statusFilterTodos === Status.Completed && todo.completed)) &&
                        <TodoItem
                            key={todo.id}
                            {...todo}
                        />
                    )}
                </ul>

                <div className='todos__footer'>
                    <p className={clsx('todos__task-counter', (taskСounter === 0) && 'todos__task-counter_hiden')}>{taskСounter} item{(taskСounter > 1) && 's'} left</p>
                    <div className='todos__filter'>
                        <label>
                            <input
                                type="radio"
                                name="filter"
                                value={Status.All}
                                onChange={() => setStatusFilterTodos(Status.All)}
                                checked={statusFilterTodos === Status.All ? true : false}
                            />
                            <span>All</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="filter"
                                value={Status.Active}
                                onChange={() => setStatusFilterTodos(Status.Active)}
                                checked={statusFilterTodos === Status.Active ? true : false}
                            />
                            <span>Active</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="filter"
                                value={Status.Completed}
                                onChange={() => setStatusFilterTodos(Status.Completed)}
                                checked={statusFilterTodos === Status.Completed ? true : false}
                            />
                            <span>Completed</span>
                        </label>
                    </div>
                    <button className='todos__btn app__btn' onClick={() => dispatch(cancelComplete())}>Clear completed</button>
                </div>
            </section>
            )}
        </>
    );
};

export default TodoList;