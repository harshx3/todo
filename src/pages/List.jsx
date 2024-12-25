import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useTodos } from "../context/todoContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const List = () => {

    const { todos, setTodos, setWordToShow } = useTodos();
    const [searchQuery, setSearchQuery] = useState("");
    const [showFullText, setShowFullText] = useState(null);

    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        // console.log(searchQuery);
    }

    const filteredTodos = todos.filter((todo) => (
        todo && todo.todo && todo.todo.toLowerCase().includes(searchQuery.toLowerCase())
    ));

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

    const handleUpdate = (timestamp) => {
        const selectedTodo = todos.find(todo => todo.timestamp === timestamp);
        // console.log(selectedTodo)
        if (selectedTodo) {
            const newTodo = prompt("Edit Your Todo", selectedTodo.todo);
            if (!newTodo || newTodo.trim() === "") return;
            const getNewDate = getFormattedDate();
            const getNewTime = getFormattedTime();
            const updatedTodo = {
                todo: newTodo,
                time: getNewTime,
                date: getNewDate,
                timestamp: Date.now(),
            }
            const updatedTodos = todos
                .filter(todo => todo.timestamp !== timestamp)
                .concat(updatedTodo)
                .sort((a, b) => b.timestamp - a.timestamp);

            setTodos(updatedTodos);
            localStorage.setItem("todos", JSON.stringify(todos));

            toast.success("Updated Successfully");
        }

    }

    const handleRemove = (timestamp) => {
        const listAfterRemoval = todos.filter(todo => todo.timestamp !== timestamp);
        setTodos(listAfterRemoval);
        localStorage.setItem("todos", JSON.stringify(listAfterRemoval));
        toast.warning("Removed");
    }

    const handleTodoClick = (timestamp) => {
        setShowFullText(showFullText === timestamp ? null : timestamp);

    }
    return (
        <div className="list-container">
            <div className="search-section">
                <div className="search-wrapper">
                    <Input
                        type="search"
                        placeholder="Search todos..."
                        value={searchQuery}
                        onChange={handleSearch}
                        label="Search Todos"
                        inputId="searchTodo"
                    />
                    <Button
                        name="Clear Search"
                        cName="clear-button"
                        onClick={() => setSearchQuery("")}
                    />
                </div>
            </div>

            <div className="todos-section">
                <h2 className="section-title">All Todos</h2>
                <div className="todos-grid">
                    {(searchQuery !== "" ? filteredTodos : todos).length === 0 ? (
                        <div className="empty-state">
                            <h3 className="empty-message">No todos found</h3>
                            <p className="empty-submessage">
                                {searchQuery ? "Try a different search term" : "Create your first todo!"}
                            </p>
                        </div>
                    ) : (
                        (searchQuery !== "" ? filteredTodos : todos).map((todo, index) => (
                            <div key={index} className="todo-card">
                                <div className="todo-content-wrapper">
                                    <div className="todo-main">
                                        <label className="todo-label">Title</label>
                                        <h4 className="todo-title">{todo.todoName}</h4>
                                        <label className="todo-label">Content</label>
                                        <p className="todo-text" onClick={() => handleTodoClick(todo.timestamp)}>
                                            {showFullText === todo.timestamp ? todo.todo : setWordToShow(todo.todo)}
                                        </p>
                                        <div className="todo-meta">
                                            <span className="todo-time">{todo.time}</span>
                                            <span className="todo-date">{todo.date}</span>
                                        </div>
                                    </div>
                                    <div className="todo-actions">
                                        <Button
                                            name="Update"
                                            cName="action-button update"
                                            onClick={() => handleUpdate(todo.timestamp)}
                                        />
                                        <Button
                                            name="Remove"
                                            cName="action-button remove"
                                            onClick={() => handleRemove(todo.timestamp)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <ToastContainer autoClose={1000} />
        </div>
    );
};

export default List;