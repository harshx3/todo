import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { ToastContainer, toast } from "react-toastify";
import { useTodos } from "../context/todoContext";

const Home = () => {
    const [todoValue, setTodoValue] = useState("");
    const { todos, setTodos, setWordToShow } = useTodos();
    const [homePageTodos, setHomePageTodos] = useState([]);
    const [todoTitle, setTodoTitle] = useState("");


    const getFormattedTime = () => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12; // Convert 0 to 12
        minutes = minutes < 10 ? "0" + minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    };

    const getFormattedDate = () => {
        const now = new Date();
        return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    };

    const handleAddTodo = () => {
        if (todoValue.trim() === "" || todoTitle.trim() === "") {
            toast.error("Enter the Text or Title");
            return;
        }

        const newTodo = {
            todoName: todoTitle.trim(),
            todo: todoValue.trim(),
            time: getFormattedTime(),
            date: getFormattedDate(),
            timestamp: Date.now(),
        };

        const updatedTodos = [...todos, newTodo].sort((a, b) => b.timestamp - a.timestamp);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setTodoValue("");
        setTodoTitle("");
        toast.success("Added");
    };

    useEffect(() => {
        const sortedTodos = [...todos].sort((a, b) => b.timestamp - a.timestamp).slice(0, 6);
        setHomePageTodos(sortedTodos);
    }, [todos]);

    return (

        <div className="home-container">
            <div className="input-section">
                <h2 className="section-title">Create New Todo</h2>
                <div className="input-fields">
                    <Input
                        label="Todo Title"
                        type="text"
                        placeholder="Enter todo title..."
                        value={todoTitle}
                        onChange={(e) => setTodoTitle(e.target.value)}
                        inputId="todoTitle"
                    />
                    <Input
                        label="Todo Content"
                        type="text"
                        placeholder="Enter todo content..."
                        value={todoValue}
                        onChange={(e) => setTodoValue(e.target.value)}
                        inputId="todoContent"
                    />
                </div>
                <Button name="Create Todo" onClick={handleAddTodo} cName="create-button" />
                <ToastContainer />
            </div>

            <div className="recent-section">
                <h2 className="section-title">Recent Todos</h2>
                <div className="recent-todo-grid">
                    {homePageTodos.length === 0 ? (
                        <div className="empty-state">
                            <h3 className="empty-message">No todos yet</h3>
                            <p className="empty-submessage">Create your first todo above!</p>
                        </div>
                    ) : (
                        homePageTodos.map((todo, index) => (
                            <div key={index} className="todo-card">
                                <div className="todo-header">
                                    <div className="todo-main">
                                        <div className="todo-title-section">
                                            <label className="todo-label">Title</label>
                                            <h4 className="todo-title">{todo.todoName}</h4>
                                        </div>
                                        <div className="todo-content-section">
                                            <label className="todo-label">Content</label>
                                            <p className="todo-content">{setWordToShow(todo.todo)}</p>
                                        </div>
                                    </div>
                                    <div className="todo-meta">
                                        <span className="todo-time">{todo.time}</span>
                                        <span className="todo-date">{todo.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );

};

export default Home;
