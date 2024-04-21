import NewTodoForm from './components/NewTodoForm/NewTodoForm';
import TodoList from './components/TodoList/TodoList';
import Header from './components/Header/Header';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header className='app__todo-list' />
      <NewTodoForm
        className='app__todo-list'
      />
      <TodoList className='app__todo-list' />
    </div>
  );
}

export default App;
