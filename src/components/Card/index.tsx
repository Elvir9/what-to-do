import React, {ChangeEvent} from 'react'
import { Card, Button, Checkbox, Input } from 'semantic-ui-react';

import './todoCard.scss';

interface Props {
    isEditMode: boolean;
    isTaskCompleted: boolean;
    fieldToEdit: string;
    taskName: string;
    checkTaskHandler(id: string, taskName: string, isTaskCompleted: boolean): void;
    id: string;
    handleEditChange(event: ChangeEvent<HTMLInputElement>): void;
    editHandler(): void;
    editTask(id: string, taskNameToEdit: string, isTaskCompleted: boolean): void;
    setIsEditMode(isEditMode: boolean): void;
    completeTask(taskNameToDelete: string): void;
}

const TodoCard = ({
    isEditMode,
    isTaskCompleted,
    fieldToEdit,
    taskName,
    checkTaskHandler,
    id,
    handleEditChange,
    editHandler,
    editTask,
    setIsEditMode,
    completeTask
}: Props) => {

    const completedTaskClassName = (taskStatus:boolean) => {
        return taskStatus ? 'done' : '';
    }

    return (
        <>
            <Card.Group>
                <Card className={completedTaskClassName(isTaskCompleted)}>
                <Card.Content>
                {
                !isEditMode && (
                    <>
                        <Checkbox
                            checked={isTaskCompleted}
                            onChange={() => checkTaskHandler(id, taskName, isTaskCompleted)}
                        />
                        <Card.Header className={completedTaskClassName(isTaskCompleted)}>
                            {taskName}
                        </Card.Header>
                    </>

                )}
                {isEditMode && (
                    <>
                        <Checkbox
                            checked={isTaskCompleted}
                            onChange={() => checkTaskHandler(id, taskName, isTaskCompleted)}
                        />
                        <Input
                            className='editTodoTask'
                            defaultValue={fieldToEdit}
                            onChange={handleEditChange}
                        />
                    </>
                )}

                </Card.Content>
                <Card.Content extra>
                    {!isEditMode && (
                        <Button
                            className={completedTaskClassName(isTaskCompleted)}
                            onClick={editHandler}
                            color='blue'
                            >
                            Edit
                        </Button>
                    )}
                    <div className='ui two buttons'>
                        {isEditMode && (
                            <>
                                <Button
                                    onClick={() => {
                                        editTask(id, fieldToEdit, isTaskCompleted)
                                        setIsEditMode(false)
                                    }}
                                    color="green"
                                >
                                    Save
                                </Button>
                                <Button
                                    onClick={() => completeTask(taskName)}
                                    color='red'
                                >
                                    Delete
                                </Button>
                            </>

                        )}
                    </div>
                </Card.Content>
                </Card>
            </Card.Group>
        </>
    )
}

export default TodoCard