import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { ToastContainer, toast } from "react-toastify";
import { useTodos } from "../context/todoContext";

const Home = () => {
    const [todoValue, setTodoValue] = useState("");
    const { todos, setTodos, setWordToShow } = useTodos();
    const [homePageTodos, setHomePageTodos] = useState([]);


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
        if (todoValue.trim() === "") {
            toast.error("Enter the Text");
            return;
        }

        const newTodo = {
            todo: todoValue,
            time: getFormattedTime(),
            date: getFormattedDate(),
            timestamp: Date.now(),
        };

        const updatedTodos = [...todos, newTodo].sort((a, b) => b.timestamp - a.timestamp);
        setTodos(updatedTodos);
        setTodoValue("");
        toast.success("Added");
    };

    useEffect(() => {
        const sortedTodos = [...todos].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
        setHomePageTodos(sortedTodos);
    }, [todos]);

    return (
        <>
            <div className="input-button-container">
                <Input
                    type="text"
                    placeholder="Enter your Text"
                    inputId="todoInput"
                    value={todoValue}
                    onChange={(e) => setTodoValue(e.target.value)}
                />
                <Button name="Create" onClick={handleAddTodo} cName={"button"} />
                <ToastContainer autoClose={1000} />
            </div>
            <div className="recent-todo-container">
                <h3> Recent Todos</h3>

                {homePageTodos.map((todo, index) => (
                    <div key={index} className="recent-todos">
                        <p style={{ color: "#3D52A0", textTransform: "capitalize", fontSize: "1.2rem" }}>{setWordToShow(todo.todo)}</p>
                        <div>
                            <p style={{ fontWeight: "bold", color: "#3D52A0" }}>{todo.time}</p>
                            <p style={{ fontWeight: "bold", color: "#3D52A0" }}>{todo.date}</p>
                        </div>
                    </div>
                ))}

            </div>
        </>
    );
};

export default Home;
