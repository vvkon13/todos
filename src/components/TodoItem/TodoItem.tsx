import { useAppDispatch } from '../../hooks';
import { toggleComplete } from '../../store/todoSlice';
import './TodoItem.css';

interface TodoItemProps {
    id: string,
    title: string,
    completed: boolean,
}

const TodoItem:React.FC<TodoItemProps> = ({ id, title, completed }) => {
    const dispatch = useAppDispatch();

    return (
        <li className='item'>
            <input
                type='checkbox'
                checked={completed}
                onChange={() => dispatch(toggleComplete(id))}
                className='item__checkbox'
            />
            <span className='item__title'>{title}</span>
        </li>
    );
};

export default TodoItem;