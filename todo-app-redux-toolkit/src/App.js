
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addTask } from './redux/reducers/taskSlice';
import TasksList from './components/tasks';

function App() {
  // const tasks = useSelector(state => state.tasks);
  const [taskInputValue, setTaskInputValue] = useState("");
  const dispatch = useDispatch();


  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: new Date().getTime(),
      task: taskInputValue,
      complete: false
    }

    dispatch(addTask(newTask)) ;
    setTaskInputValue('');
  }

  return <div className='max-w-6xl mx-auto mt-10 px-3'>
    <form onSubmit={handleTaskSubmit} className='flex flex-col sm:flex-row gap-3 mx-auto'>
      <input type='text' placeholder='Write to add a task...' className='p-3 rounded-lg sm:w-4/5 border' value={taskInputValue} onChange={(e) => {setTaskInputValue(e.target.value)}} id="taskInput" />
      <button className='p-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xl sm:w-1/5' >Add task</button>
    </form>

    <div className='flex flex-col my-6 max-w-4xl mx-auto'>
      <h2 className='text-3xl'>Tasks list</h2>

      <TasksList />
    </div>
  </div>
}

export default App;
