import { useEffect, useRef, useState, HTMLAttributes } from "react";
import { clsx } from 'clsx';

import { useAppDispatch } from '../../hooks';
import { addTodo } from '../../store/todoSlice';
import './NewTodoForm.css'


const NewTodoForm: React.FC<HTMLAttributes<HTMLElement>> = ({ className }) => {
    const [text, setText] = useState('');
    const dispatch = useAppDispatch();

    const handleAction = () => {
        if (text.trim().length) {
            dispatch(addTodo(text));
            setText('');
        }
    }
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [])

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') handleAction()
    }

    return (
        <div className={clsx(className, 'form')}>
            <button className='form__btn app__btn' onClick={handleAction}>Add</button>

            <input className='form__input'
                type="text"
                placeholder='Whats need to be done'
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />

        </div>
    );
};

export default NewTodoForm;