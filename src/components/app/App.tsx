import styles from './App.module.css';
import { Provider } from 'react-redux';
import taskStore from '../task-list/store/taskStore';
import AddTaskButton from '../task-list/components/add-task-btn/add-task';
import TaskList from '../task-list/components/task-list/task-list';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Provider store={taskStore}>
        <div className={styles.mainContainer}>
          <h1>Список задач</h1>
          <AddTaskButton />
          <TaskList />
        </div>
      </Provider>
    </div>
  );
}

export default App;
