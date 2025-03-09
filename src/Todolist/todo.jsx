import React from 'react'
import './todo.css'
import { useState } from 'react'
import { useEffect } from 'react';
function todoFunction() {

    const [task, setTask] = useState([]);
    const [activity, setactivity] = useState({ newTask: '', newDate: '' });

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTask(JSON.parse(storedTasks));
        }
    }, [])

    useEffect(() => {
        if (task.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(task));
        }
    }, [task])

    function clickedFunction() {
        if (activity.newTask.trim() == '' || activity.newDate.trim() == '') {
            alert("No tasks available");
            return;
        }
        setTask([...task, { newTask: activity.newTask, newDate: activity.newDate },]);
        setactivity({ newTask: '', newDate: '' })
    }
    function removeBtn(index) {
        setTask(task.filter((e, i) => i !== index))
    }

    function clearAll() {
        setTask([])
        localStorage.removeItem('tasks')
    }
    return (
        <div className='todo-container'>
            <div className="container">
                <h1>Todo List</h1>

                <div className="input-container">
                    <div className="input-box">
                        <input type='text' placeholder='Enter a task' value={activity.newTask} onChange={(e) => setactivity({ ...activity, newTask: e.target.value })} />
                        <input type="date" placeholder='Date' value={activity.newDate} onChange={(e) => setactivity({ ...activity, newDate: e.target.value })} />
                    </div>
                    <button className='addButton' onClick={clickedFunction}>Add</button>
                </div>
                <div className="outputBox">
                    <ul>
                        {task.length > 0 ? task.map((item, index) => {
                            return <li key={index}>
                                <span className='showValue'>{item.newTask}</span>
                                <span>{item.newDate}</span>
                                <span onClick={() => removeBtn(index)} className='remButton'>X</span></li>
                        }) : <h5 className='noData'>No data available</h5>}
                    </ul>
                </div>
                <div className='clearBtn'>
                    <button className='btn btn-danger' onClick={clearAll}>Clear All </button>
                </div>
            </div>
        </div>
    )
}

export default todoFunction

