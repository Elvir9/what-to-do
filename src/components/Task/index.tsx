import React, {FC, ChangeEvent, useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form } from 'semantic-ui-react'


import {NewTask} from '../../Interfaces';
import TaskDetails from '../TaskDetails';

import './task.scss'


const TaskForm: FC = () => {
    const [task, setTask] = useState<string>("");
    const [todoList, setTodoList] = useState<NewTask[]>([]);

    const uid = "id" + Math.random().toString(16).slice(2);

    useEffect(() => {
        const listFromLocalStorage = JSON.parse(localStorage.getItem('todoList') || '[]');
        setTodoList(listFromLocalStorage);
    }, []);

    useEffect(() => {
        window.localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList])

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTask(event.target.value);
    };

    const handleAddTask = (): void => {
        const newTask = { id: uid, taskName: task, isDone: false };

        if (task !== "") {
            setTodoList([newTask, ...todoList]);
            toast.success('Task is added!');
        }
        setTask("");
    };

    const editTask = (id: string, taskNameToEdit: string, isDone: boolean) => {
        const changedTask = todoList.map((item) => {
            if (item.id === id) {
                return {
                    id,
                    taskName: taskNameToEdit,
                    isDone,
                }
            }
            return item
        });
        setTodoList(changedTask);
        toast.info('Task is updated!');

    };

    const completeTask = (taskNameToDelete: string) => {
        setTodoList(todoList.filter(({taskName}) => {
            return taskName !== taskNameToDelete;
        }))
        toast.error('Task is deleted!');
    };

    return (
        <div className='form-task-container'>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                />
            <Form>
            <Form.Field>
                <label>Add new task</label>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    name='task'
                    onChange={handleChange}
                    value={task}
                />
                </Form.Field>
                <div className='submit-task-container'>
                    <Button
                        className='submit-task-button'
                        type='button'
                        onClick={handleAddTask}
                    >
                        Add to list
                    </Button>
                </div>

            </Form>
            {todoList.map((task: NewTask, key: number) => {
                return <TaskDetails key={task.id} task={task} completeTask={completeTask} editTask={editTask} />
            })}
        </div>

    )
}

export default TaskForm