import { ListChecks } from 'lucide-react';
import { HTMLAttributes } from 'react';

import { useAppDispatch } from '../../hooks';
import { allComplete } from '../../store/todoSlice';
import './Header.css'

const Header: React.FC<HTMLAttributes<HTMLElement>> = ({ className }) => {
    const dispatch = useAppDispatch();
    return (
        <header className={className}>
            <button className='header app__btn' onClick={() => dispatch(allComplete())}>
                <ListChecks color="#94A3B8" size={64} absoluteStrokeWidth={true} />
                <h1>todos</h1>
            </button>
        </header>
    )
}

export default Header;