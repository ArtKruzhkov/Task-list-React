import './App.css';
import { Provider } from 'react-redux';
import taskStore from '../task-list/store/taskStore';
import AddTaskButton from '../task-list/components/add-task-btn/add-task';
import TaskList from '../task-list/components/task-list/task-list';

function App() {
  return (
    <div className="App">
      <div className='Seminar-6'>
        <Provider store={taskStore}>
          <div style={{ padding: 20 }}>
            <h1>Список задач</h1>
            <AddTaskButton />
            <TaskList />
          </div>
        </Provider>
      </div>
    </div>
  );
}

export default App;
