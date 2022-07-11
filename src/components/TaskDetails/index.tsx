import React, {ChangeEvent, useState} from 'react'

import { NewTask } from '../../Interfaces'
import TodoCard from '../Card';

interface Props {
    task: NewTask;
    editTask(id: string, taskNameToEdit: string, isTaskCompleted: boolean): void;
    completeTask(taskNameToDelete: string): void;
}

const TaskDetails = ({ task: { id, taskName, isDone }, editTask, completeTask }: Props) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [fieldToEdit, setFieldToEdit] = useState<string>(taskName);
    const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(false);

    const handleEditChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setFieldToEdit(event?.target.value);
    }

    const editHandler = (): void => {
        setIsEditMode(true);
    }

    const checkTaskHandler = (
        id: string,
        taskName: string,
        isTaskCompleted: boolean
    ) => {
        setIsTaskCompleted(!isTaskCompleted);
        editTask(id, taskName, isTaskCompleted);
        setIsEditMode(false);
    }

    return (
        <TodoCard
            isEditMode={isEditMode}
            isTaskCompleted={isTaskCompleted}
            fieldToEdit={fieldToEdit}
            taskName={taskName}
            checkTaskHandler={checkTaskHandler}
            id={id}
            handleEditChange={handleEditChange}
            editHandler={editHandler}
            editTask={editTask}
            setIsEditMode={setIsEditMode}
            completeTask={completeTask}
        />
    )
}

export default TaskDetails