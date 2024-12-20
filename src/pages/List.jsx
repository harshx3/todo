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
        <div>
            <ToastContainer time={1000} />
            <div className="search-button-container">
                <Input type="search" placeholder={"Search todo"} value={searchQuery} onChange={handleSearch} />
                <Button name={"Clear Input"} cName={"button"} onClick={handleSearch} />
            </div>
            <h1 style={{ textAlign: "center", marginTop: "1rem" }}>All Todos</h1>
            <div className="todos-list-container">
                {(searchQuery !== "" ? filteredTodos : todos).map((todo, index) => (
                    <div key={index} className="recent-todos">
                        <div className="list-text-date-div">
                            <p onClick={() => handleTodoClick(todo.timestamp)} style={{ color: "#3D52A0", textTransform: "capitalize", fontSize: "1.2rem", cursor: "pointer" }}>{showFullText === todo.timestamp ? todo.todo : setWordToShow(todo.todo)}</p>
                            <div>
                                <p style={{ fontWeight: "bold", color: "#3D52A0" }}>{todo.time}</p>
                                <p style={{ fontWeight: "bold", color: "#3D52A0" }}>{todo.date}</p>
                            </div>
                        </div>
                        <div className="list-button-div">
                            <Button name={"Update"} cName={"button"} onClick={() => handleUpdate(todo.timestamp)} />
                            <Button name={"Remove"} cName={"button"} onClick={() => handleRemove(todo.timestamp)} />
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
};

export default List;