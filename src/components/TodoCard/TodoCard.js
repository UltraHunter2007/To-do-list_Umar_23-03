import React from 'react';
import classes from "./TodoCard.module.css";

const TodoCard = ({ task, handleDone, handleDelete }) => {
    console.log(task, 't')
    return (
        <div className={ task.completed ? `${classes.todoCard} ${classes.done}`: classes.todoCard }>
            <h3>{task.title}</h3>
            <button onClick={() => handleDone(task.id)}>Done</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
    );
};

export default TodoCard;