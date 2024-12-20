import React, { createContext, useContext, useEffect, useState } from "react";


const TodoContext = createContext();

export const useTodos = () => {
    return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) setTodos(JSON.parse(savedTodos));
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    const setWordToShow = (todoText) => {
        if (!todoText || typeof todoText !== "string") return "";
        const words = todoText.split(" ") ?? "helloWorld";
        // console.log(words);
        // console.log(words);
        return words.length > 7 ? words.slice(0, 7).join(" ") + "..." : todoText;
    };

    return (
        <TodoContext.Provider value={{ todos, setTodos, setWordToShow }}>
            {children}
        </TodoContext.Provider>
    )
}
