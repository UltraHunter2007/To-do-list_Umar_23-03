import Modal from './components/Modal/Modal';
import { useEffect, useState } from 'react';
import classes from './App.module.css'
import Container from './components/Container/Container';
import Button from './components/Button/Button';
import TodoCard from "./components/TodoCard/TodoCard";
import Input from "./components/Input/Input";
function App() {

    const [ isShow, setIsShow ] = useState(false);
    const [ newTask, setNewTask ] = useState('');
    const [ search, setSearch ] = useState('');
    const [ currentEdit, setCurrentEdit ] = useState(null)
    const [ filter, setFilter ] = useState('all')
    const [ tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleShow = () => setIsShow(!isShow);

    const handleAddTask = () => {

        if (newTask.length < 1) return
            setTasks((prevState) => [...prevState,
                {
                    id: Date.now(),
                    title: newTask,
                    completed: false
                }
            ])
            setNewTask('')
            handleShow();
    }

    const handleDone = (id) => {
        const newList = tasks.map(task => {
            if (task.id === id) {
                return {...task, completed: !task.completed}
            }else {
                return task
            }
        })
        setTasks([...newList])
    }

    const handleDelete = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const handleEdit = (editTask) => {
        setCurrentEdit(null)
        const editList = tasks.map(task => {
            if (task.id === editTask.id) {
                return editTask
            }else {
                return task
            }
        })
        setTasks([...editList])
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    const handleClearAll = () => {
        setTasks([]);
        localStorage.removeItem('tasks');
    }

    let filteredTasks = tasks;

    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === "incomplete") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    return (
        <>
            <Container>
                <div className={classes.wrapper}>
                    { isShow && <Modal handleShow={handleShow} /> }
                    { isShow && <Modal handleAddTask={handleAddTask} setNewTask={setNewTask} handleShow={handleShow} /> }
                    <div className={classes.buttons}>
                        <Button handleClick={handleShow}><p>Add Task</p></Button>
                        <Button handleClick={handleClearAll}><p>Clear All</p></Button>
                    </div>
                    <select value={filter} onChange={handleFilterChange}>
                        <option value="all">All Tasks</option>
                        <option value="completed">Completed Tasks</option>
                        <option value="incomplete">Incomplete Tasks</option>
                    </select>
                    <Input name="search" placeholder="Search..." value={search} onChange={handleSearch} />

                    { filteredTasks.map(task =>
                        <TodoCard
                        handleDone={handleDone}
                        handleDelete={handleDelete}
                        handleSelectEdit={setCurrentEdit}
                        isEdit={ currentEdit === task.id}
                        handleEdit={handleEdit}
                        key={task.id}
                        task={task} />
                    )}
                </div>
            </Container>
        </>
    );
}

export default App;