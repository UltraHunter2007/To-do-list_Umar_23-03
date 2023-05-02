import React, { useState } from 'react';
import classes from "./TodoCard.module.css";

const TodoCard = ({ task, handleDone, handleDelete, handleSelectEdit, isEdit, handleEdit }) => {
    const [ newTitle, setNewTitle ] = useState(task.title)
    const handleNewTitle = (title) => {
        setNewTitle(title)
    }
    if (isEdit) {
        return <div>
            <input onChange={(event) => handleNewTitle(event.target.value)} value={newTitle} placeholder='edit' type="text"/>
            <button onClick={() => handleEdit({...task, title: newTitle})}>Save</button>
            <button onClick={() => handleEdit({...task, title: task.title})}>Cancel</button>
        </div>
    }else {
        return (
            <div className={ task.completed ? `${classes.todoCard} ${classes.done}`: classes.todoCard }>
                <h3>{task.title}</h3>
                <button onClick={() => handleDone(task.id)}>Done</button>
                <button className={classes.edit} onClick={() => handleSelectEdit(task.id)}>Edit</button>
                <button className={classes.delete} onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
        );
    }
};

export default TodoCard;