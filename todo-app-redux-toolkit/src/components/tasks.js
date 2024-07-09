import { useDispatch, useSelector } from "react-redux"
import { editExistingTask, removeTask } from "../redux/reducers/taskSlice";
import { useEffect, useRef, useState } from "react";



const TasksList = () => {
    const tasks = useSelector(state => state.tasks.taskList);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskInput, setEditTaskInput] = useState();
    const inputRef = useRef(null);

    const dispatch = useDispatch();

    const handleEditTask = (task) => {
        setEditTaskId(task.id);
        setEditTaskInput(task.task);
    }

    const handleSaveTask = (taskId) => {
        dispatch(editExistingTask({ id: taskId, task: editTaskInput }));
        setEditTaskId(null);
    }


    useEffect(() => {
        if (editTaskId !== null && inputRef !== null) {
            inputRef.current.focus();
            inputRef.current.selectionStart = inputRef.current.value.length;
        }
    }, [editTaskId])


    return <div className="taskDiv flex flex-col gap-3 my-3">
        {tasks.length > 0 ? tasks.map(task => {
            return <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg sm:items-center justify-between" key={task.id}>
                {editTaskId ? <input type="text" ref={inputRef} className="w-3/4 outline-none text-xl p-3 rounded-md cursor-pointer bg-gray-100" value={editTaskInput} onChange={(e) => setEditTaskInput(e.target.value)} /> : <p className="w-3/4 text-xl text-wrap">{task.task}</p>}
                {editTaskId ? <button className="p-3 rounded-lg bg-green-700 hover:bg-green-600 text-white" onClick={() => handleSaveTask(task.id)}>Save task</button> :
                    <button className="p-3 rounded-lg bg-green-700 hover:bg-green-600 text-white" onClick={() => handleEditTask(task)}>Edit task</button>}
                <button className="p-3 rounded-lg bg-red-700 hover:bg-red-600 text-white" onClick={() => dispatch(removeTask({ id: task.id }))}>Delete</button>

            </div>
        }) : <p className="text-xl text-green-700 text-center mt-10">No task is pending!</p>
        }
    </div>
}


export default TasksList